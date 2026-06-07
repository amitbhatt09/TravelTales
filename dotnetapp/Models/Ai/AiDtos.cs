using System.Text.Json.Serialization;

namespace dotnetapp.Models.Ai
{
    public class ItineraryRequest
    {
        public string Destination { get; set; } = "";
        public int NumberOfDays { get; set; }
        public string Budget { get; set; } = "";
        public string[] Interests { get; set; } = Array.Empty<string>();
    }

    public class ItineraryResponse
    {
        public string Destination { get; set; } = "";
        public int NumberOfDays { get; set; }
        public string Budget { get; set; } = "";
        public string[] Interests { get; set; } = Array.Empty<string>();
        public ItineraryDay[] Days { get; set; } = Array.Empty<ItineraryDay>();
    }

    public class ItineraryDay
    {
        public int Day { get; set; }
        public string Title { get; set; } = "";
        public ItineraryItem[] Items { get; set; } = Array.Empty<ItineraryItem>();
        public string? Notes { get; set; }
    }

    public class ItineraryItem
    {
        public string TimeOfDay { get; set; } = "";
        public string Activity { get; set; } = "";
        public string? Location { get; set; }
        public string? EstimatedCost { get; set; }
    }

    public class GenerateDescriptionRequest
    {
        public string Name { get; set; } = "";
        public string Category { get; set; } = "";
        public string Location { get; set; } = "";
        public string? BestTimeToVisit { get; set; }
        public string Tone { get; set; } = "friendly";
    }

    public class GenerateDescriptionResponse
    {
        public string Description { get; set; } = "";
    }

    public class ChatRequest
    {
        public string Message { get; set; } = "";
        public string? Destination { get; set; }
    }

    public class ChatResponse
    {
        public string Reply { get; set; } = "";
    }

    // Minimal OpenAI Chat Completions wire models (no external SDK)
    internal class OpenAiChatCompletionsRequest
    {
        [JsonPropertyName("model")]
        public string Model { get; set; } = "gpt-4o-mini";

        [JsonPropertyName("messages")]
        public List<OpenAiChatMessage> Messages { get; set; } = new();

        [JsonPropertyName("temperature")]
        public double Temperature { get; set; } = 0.7;

        [JsonPropertyName("response_format")]
        public OpenAiResponseFormat? ResponseFormat { get; set; }
    }

    internal class OpenAiResponseFormat
    {
        [JsonPropertyName("type")]
        public string Type { get; set; } = "json_object";
    }

    internal class OpenAiChatMessage
    {
        [JsonPropertyName("role")]
        public string Role { get; set; } = "user";

        [JsonPropertyName("content")]
        public string Content { get; set; } = "";
    }

    internal class OpenAiChatCompletionsResponse
    {
        [JsonPropertyName("choices")]
        public List<OpenAiChatChoice> Choices { get; set; } = new();
    }

    internal class OpenAiChatChoice
    {
        [JsonPropertyName("message")]
        public OpenAiChatMessage Message { get; set; } = new();
    }
}

