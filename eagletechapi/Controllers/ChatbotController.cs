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
    public async Task<IActionResult> Conversation([FromBody] ChatbotPart chatbotPart, long numeroChamado)
    {
        var response = await this._chatbotService.Conversation(numeroChamado, chatbotPart);
        return Ok(response);
    }

    [HttpGet]
    public async Task<IActionResult> Conversation(long numeroChamado)
    {
        return Ok(await this._chatbotService.Conversation(numeroChamado));
    }


}