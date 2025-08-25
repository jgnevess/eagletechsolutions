using eagletechapi.dto.chamado;
using eagletechapi.models.chamado.enums;
using eagletechapi.service.implements;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace eagletechapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamadosController(ChamadoService chamadoService) : ControllerBase
    {

        private string tratarExeption(ModelStateDictionary stateDictionary)
        {
            return ModelState.Values
                .SelectMany(v => v.Errors)
                .Select(e => e.ErrorMessage)
                .FirstOrDefault() ?? "Erro na validação";
        }
        
        [HttpPost("abrir-chamado")]
        [Authorize(Roles = "SOLICITANTE")]
        public async Task<IActionResult> AbrirChamado(ChamadoIn chamadoIn)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Dictionary<string, string>()
                {
                    { "Error", tratarExeption(ModelState) }
                });
            }
            
            var res = await chamadoService.AbrirChamado(chamadoIn);
            
            return Ok(res);
        }

        [Authorize]
        [HttpGet("chamados-abertos")]
        public async Task<IActionResult> BuscarChamadosAbertos()
        {
            return Ok(await chamadoService.BuscarChamadosSolicitante(Status.ABERTO));
        }

        [Authorize]
        [HttpGet("chamados")]
        public async Task<IActionResult> BuscarChamadoPorStatus(Status status)
        {
            return Ok(await chamadoService.BuscarChamadosSolicitante(status));
        }
        
        [Authorize(Roles = "SOLICITANTE")]
        [HttpGet("chamados-solicitante")]
        public async Task<IActionResult> BuscarChamadoPorStatusESolcitante(int solicitante, Status status)
        {
            return Ok(await chamadoService.BuscarChamadosSolicitante(solicitante, status));
        }
        
        [Authorize(Roles = "SOLICITANTE")]
        [HttpGet("chamados-solicitante-abertura")]
        public async Task<IActionResult> BuscarChamadoPorStatusESolcitante(int solicitante, Status status, DateTime abertura)
        {
            return Ok(await chamadoService.BuscarChamadosSolicitante(solicitante, status, abertura));
        }
        
        [Authorize(Roles = "SOLICITANTE")]
        [HttpGet("chamados-solicitante-abertura-fechamento")]
        public async Task<IActionResult> BuscarChamadoPorStatusESolcitante(int solicitante, Status status, DateTime abertura, DateTime fechamento)
        {
            return Ok(await chamadoService.BuscarChamadosSolicitante(solicitante, status, abertura, fechamento));
        }
        
        // tecnico 
        
        [Authorize(Roles = "TECNICO")]
        [HttpGet("chamados-tecnico")]
        public async Task<IActionResult> BuscarChamadoPorStatusETecnico(int tecnico, Status status)
        {
            return Ok(await chamadoService.BuscarChamadosTecnico(tecnico, status));
        }
        
        [Authorize(Roles = "TECNICO")]
        [HttpGet("chamados-tecnico-abertura")]
        public async Task<IActionResult> BuscarChamadoPorStatusETecnico(int tecnico, Status status, DateTime abertura)
        {
            return Ok(await chamadoService.BuscarChamadosTecnico(tecnico, status, abertura));
        }
        
        [Authorize(Roles = "TECNICO")]
        [HttpGet("chamados-tecnico-abertura-fechamento")]
        public async Task<IActionResult> BuscarChamadoPorStatusETecnico(int tecnico, Status status, DateTime abertura, DateTime fechamento)
        {
            return Ok(await chamadoService.BuscarChamadosTecnico(tecnico, status, abertura, fechamento));
        }
    }
}