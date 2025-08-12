using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.chamado;
using eagletechapi.service;
using Microsoft.AspNetCore.Mvc;

namespace eagletechapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ChamadosController : ControllerBase
    {

        private readonly ChamadoService __service;

        public ChamadosController(ChamadoService chamadoService)
        {
            this.__service = chamadoService;
        }

        [HttpGet]
        public async Task<IActionResult> test()
        {
            return Ok("Ok está controlado kkk");
        }

        [HttpPost]
        public async Task<IActionResult> CriarChamado([FromBody] ChamadoIn chamadoIn)
        {
            var chamado = await __service.CriarChamado(chamadoIn);
            return Ok(chamado);
        }

        [HttpGet("BuscarTodos")]
        public async Task<IActionResult> BuscarTodos(long numeroChamado)
        {
            var res = await __service.BuscarTodosPorChamados(numeroChamado);
            return Ok(res);
        }
    }
}