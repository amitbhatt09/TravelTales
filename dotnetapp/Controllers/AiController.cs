using dotnetapp.Models.Ai;
using dotnetapp.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/ai")]
    public class AiController : ControllerBase
    {
        private readonly IAIService _ai;

        public AiController(IAIService ai)
        {
            _ai = ai;
        }

        [HttpPost("itinerary")]
        [Authorize(Roles = "Guide,Traveller")]
        public async Task<ActionResult<ItineraryResponse>> GenerateItinerary([FromBody] ItineraryRequest request, CancellationToken ct)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Destination) || request.NumberOfDays <= 0)
            {
                return BadRequest(new { Message = "destination and numberOfDays are required." });
            }

            try
            {
                var res = await _ai.GenerateItinerary(request, ct);
                return Ok(res);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [HttpPost("generate-description")]
        [Authorize(Roles = "Guide")]
        public async Task<ActionResult<GenerateDescriptionResponse>> GenerateDescription([FromBody] GenerateDescriptionRequest request, CancellationToken ct)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Location))
            {
                return BadRequest(new { Message = "name and location are required." });
            }

            try
            {
                var res = await _ai.GenerateDescription(request, ct);
                return Ok(res);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }

        [HttpPost("chat")]
        [Authorize(Roles = "Guide,Traveller")]
        public async Task<ActionResult<ChatResponse>> Chat([FromBody] ChatRequest request, CancellationToken ct)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.Message))
            {
                return BadRequest(new { Message = "message is required." });
            }

            try
            {
                var res = await _ai.Chat(request, ct);
                return Ok(res);
            }
            catch (InvalidOperationException ex)
            {
                return StatusCode(500, new { Message = ex.Message });
            }
        }
    }
}

