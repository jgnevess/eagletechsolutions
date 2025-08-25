using System.Threading.Tasks;
using eagletechapi.http;
using eagletechapi.models;
using eagletechapi.service.implements;
using Microsoft.AspNetCore.Mvc;

namespace eagletechapi.Controllers;

[ApiController]
[Route("[controller]")]
public class ChatbotController(ChatbotService chatbotService) : ControllerBase
{

    private readonly ChatbotService _chatbotService = chatbotService;

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