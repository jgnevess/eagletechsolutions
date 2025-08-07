using System.Threading.Tasks;
using eagletechapi.http;
using eagletechapi.models;
using eagletechapi.services;
using Microsoft.AspNetCore.Mvc;

namespace eagletechapi.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatbotController : ControllerBase
{

    private readonly ChatbotService _chatbotService;

    public ChatbotController(ChatbotService chatbotService)
    {
        this._chatbotService = chatbotService;
    }

    [HttpPost]
    public async Task<IActionResult> Conversation([FromBody] ChatbotPart chatbotPart)
    {
        var response = await this._chatbotService.Conversation(chatbotPart: chatbotPart);
        return Ok(response);
    }


}