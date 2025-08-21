using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.chamado;
using eagletechapi.service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eagletechapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamadosController(ChamadoService chamadoService) : ControllerBase
    {

        private readonly ChamadoService _service = chamadoService;

        [HttpPost]
        public async Task<IActionResult> CriarChamado([FromBody] ChamadoIn chamadoIn)
        {
            var chamado = await _service.CriarChamado(chamadoIn);
            return Ok(chamado);
        }

        [HttpGet("BuscarTodos")]
        public async Task<IActionResult> BuscarTodos(long numeroChamado)
        {
            var res = await _service.BuscarTodosPorChamados(numeroChamado);
            return Ok(res);
        }

        [HttpGet("Test")]
        [Authorize]
        public IActionResult TestController()
        {
            return Ok("Está funcionando");
        }
    }
}