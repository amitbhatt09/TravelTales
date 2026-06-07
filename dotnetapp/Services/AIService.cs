using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using dotnetapp.Models.Ai;
using Microsoft.Extensions.Configuration;

namespace dotnetapp.Services
{
    public class AIService : IAIService
    {
        private readonly HttpClient _http;
        private readonly IConfiguration _config;
        private static readonly JsonSerializerOptions JsonOpts = new()
        {
            PropertyNameCaseInsensitive = true
        };

        public AIService(HttpClient http, IConfiguration config)
        {
            _http = http;
            _config = config;
        }

        private string GetApiKeyOrThrow()
        {
            var key =
                Environment.GetEnvironmentVariable("OPENAI_API_KEY") ??
                _config["OpenAI:ApiKey"];

            if (string.IsNullOrWhiteSpace(key))
            {
                throw new InvalidOperationException("OpenAI API key is not configured. Set OPENAI_API_KEY environment variable.");
            }

            return key;
        }

        private string GetBaseUrl() =>
            _config["OpenAI:BaseUrl"]?.TrimEnd('/') ?? "https://api.openai.com/v1";

        private string GetModel() =>
            _config["OpenAI:Model"] ?? "gpt-4o-mini";

        private async Task<string> CreateChatCompletionJsonAsync(string systemPrompt, string userPrompt, bool forceJson, CancellationToken ct)
        {
            var apiKey = GetApiKeyOrThrow();

            var payload = new OpenAiChatCompletionsRequest
            {
                Model = GetModel(),
                Temperature = 0.6,
                ResponseFormat = forceJson ? new OpenAiResponseFormat { Type = "json_object" } : null,
                Messages = new List<OpenAiChatMessage>
                {
                    new() { Role = "system", Content = systemPrompt },
                    new() { Role = "user", Content = userPrompt }
                }
            };

            using var req = new HttpRequestMessage(HttpMethod.Post, $"{GetBaseUrl()}/chat/completions");
            req.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);
            req.Content = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            using var res = await _http.SendAsync(req, ct);
            var body = await res.Content.ReadAsStringAsync(ct);

            if (!res.IsSuccessStatusCode)
            {
                throw new InvalidOperationException($"AI provider error ({(int)res.StatusCode}): {body}");
            }

            var parsed = JsonSerializer.Deserialize<OpenAiChatCompletionsResponse>(body, JsonOpts);
            var content = parsed?.Choices?.FirstOrDefault()?.Message?.Content;
            if (string.IsNullOrWhiteSpace(content))
            {
                throw new InvalidOperationException("AI provider returned an empty response.");
            }

            return content;
        }

        public async Task<ItineraryResponse> GenerateItinerary(ItineraryRequest request, CancellationToken ct)
        {
            var system = "You are a travel planner. Output strictly valid JSON matching the requested schema.";
            var interests = request.Interests?.Length > 0 ? string.Join(", ", request.Interests) : "general sightseeing";

            var user = $@"
Create a {request.NumberOfDays}-day travel itinerary for:
- destination: {request.Destination}
- budget: {request.Budget}
- interests: {interests}

Return JSON with this exact shape:
{{
  ""Destination"": string,
  ""NumberOfDays"": number,
  ""Budget"": string,
  ""Interests"": string[],
  ""Days"": [
    {{
      ""Day"": number,
      ""Title"": string,
      ""Items"": [
        {{
          ""TimeOfDay"": ""Morning""|""Afternoon""|""Evening"",
          ""Activity"": string,
          ""Location"": string|null,
          ""EstimatedCost"": string|null
        }}
      ],
      ""Notes"": string|null
    }}
  ]
}}
";

            var json = await CreateChatCompletionJsonAsync(system, user, forceJson: true, ct);

            // Provider may return json text; parse to our DTO.
            var itinerary = JsonSerializer.Deserialize<ItineraryResponse>(json, JsonOpts);
            if (itinerary == null || itinerary.Days == null || itinerary.Days.Length == 0)
            {
                throw new InvalidOperationException("AI itinerary response could not be parsed.");
            }

            // Ensure echo fields are present for UI consistency
            itinerary.Destination = string.IsNullOrWhiteSpace(itinerary.Destination) ? request.Destination : itinerary.Destination;
            itinerary.NumberOfDays = itinerary.NumberOfDays == 0 ? request.NumberOfDays : itinerary.NumberOfDays;
            itinerary.Budget = string.IsNullOrWhiteSpace(itinerary.Budget) ? request.Budget : itinerary.Budget;
            itinerary.Interests = (itinerary.Interests?.Length ?? 0) == 0 ? (request.Interests ?? Array.Empty<string>()) : itinerary.Interests;

            return itinerary;
        }

        public async Task<GenerateDescriptionResponse> GenerateDescription(GenerateDescriptionRequest request, CancellationToken ct)
        {
            var system = "You are a destination copywriter. Output strictly valid JSON.";
            var user = $@"
Write a concise, appealing destination description (120-180 words).
Tone: {request.Tone}
Name: {request.Name}
Category: {request.Category}
Location: {request.Location}
BestTimeToVisit: {(request.BestTimeToVisit ?? "unknown")}

Return JSON: {{ ""Description"": string }}";

            var json = await CreateChatCompletionJsonAsync(system, user, forceJson: true, ct);
            var parsed = JsonSerializer.Deserialize<GenerateDescriptionResponse>(json, JsonOpts);
            if (parsed == null || string.IsNullOrWhiteSpace(parsed.Description))
            {
                throw new InvalidOperationException("AI description response could not be parsed.");
            }

            return parsed;
        }

        public async Task<ChatResponse> Chat(ChatRequest request, CancellationToken ct)
        {
            var system = "You are a helpful travel assistant. Keep replies short, actionable, and safe.";
            var user = string.IsNullOrWhiteSpace(request.Destination)
                ? request.Message
                : $"Destination context: {request.Destination}\n\nUser: {request.Message}";

            var reply = await CreateChatCompletionJsonAsync(system, user, forceJson: false, ct);
            return new ChatResponse { Reply = reply.Trim() };
        }
    }
}

