using dotnetapp.Models.Ai;

namespace dotnetapp.Services
{
    public interface IAIService
    {
        Task<ItineraryResponse> GenerateItinerary(ItineraryRequest request, CancellationToken ct);
        Task<GenerateDescriptionResponse> GenerateDescription(GenerateDescriptionRequest request, CancellationToken ct);
        Task<ChatResponse> Chat(ChatRequest request, CancellationToken ct);
    }
}

