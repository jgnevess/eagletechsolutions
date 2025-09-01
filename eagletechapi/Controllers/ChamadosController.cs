using eagletechapi.dto.chamado;
using eagletechapi.entity.chamado.enums;
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
        public async Task<IActionResult> AbrirChamado([FromBody] ChamadoIn chamadoIn)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Dictionary<string, string>()
                {
                    { "Error", tratarExeption(ModelState) }
                });
            }

            try
            {
                var res = await chamadoService.AbrirChamado(chamadoIn);

                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
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
        

        // tecnico 
        
        [Authorize(Roles = "TECNICO")]
        [HttpPut("aceitar-tecnico")]
        public async Task<IActionResult> AceitarChamado(int numeroChamado, int tecnicoMatricula)
        {
            try
            {
                var res = await chamadoService.AceitarChamado(numeroChamado, tecnicoMatricula);
                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [Authorize(Roles = "TECNICO")]
        [HttpPut("fechar-tecnico")]
        public async Task<IActionResult> FinalizarChamado(int numeroChamado, int tecnicoMatricula)
        {
            try
            {
                var res = await chamadoService.FecharChamado(numeroChamado, tecnicoMatricula);
                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Authorize(Roles = "TECNICO")]
        [HttpGet("chamados-tecnico")]
        public async Task<IActionResult> BuscarChamadoPorStatusETecnico(int tecnico, Status status)
        {
            return Ok(await chamadoService.BuscarChamadosTecnico(tecnico, status));
        }

        [Authorize]
        [HttpGet("chamado")]
        public async Task<IActionResult> BuscarChamadoPorId(int numeroChamado)
        {
            var res = await chamadoService.BuscarChamado(numeroChamado);
            return Ok(res);
        }

        [Authorize(Roles = "SOLICITANTE")]
        [HttpDelete("cancelar-chamado")]
        public async Task<IActionResult> CancelarChamado(int numeroChamado)
        {
            try
            {
                await chamadoService.DeletarChamado(numeroChamado);
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            } 
        }
        
        [Authorize(Roles = "SOLICITANTE")]
        [HttpPut("editar-chamado")]
        public async Task<IActionResult> EditarChamado(int numeroChamado, ChamadoIn chamadoIn)
        {
            try
            {
                var res = await chamadoService.EditarChamado(numeroChamado, chamadoIn);
                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            } 
        }
        
    }
    
    
}