using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.usuario;
using eagletechapi.service.implements;
using eagletechapi.service.interfaces;
using Microsoft.AspNetCore.Mvc;

namespace eagletechapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController(IUserService service) : ControllerBase
    {
        [HttpPut("nova-senha")]
        public async Task<IActionResult> AlterarSenha([FromBody] SimplePasswordUpdate simplePasswordUpdate)
        {
            if (!ModelState.IsValid)
            {
                var erros = ModelState
                    .Where(x => x.Value.Errors.Count > 0)
                    .ToDictionary(
                        kvp => kvp.Key,
                        kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                    );

                return BadRequest(new Dictionary<string, string>()
                {
                    { "Error", erros["SenhaNova"].First()}
                });
            }
            try
            {
                var res = await service.AlterarSenha(simplePasswordUpdate);
                return Ok(res);

            }
            catch (Exception e)
            {
                var res = new Dictionary<string, string>
                {
                    { "Error", e.Message }
                };
                return BadRequest(res);
            }
        }
        
        [HttpGet("Usuarios")]
        public async Task<IActionResult> ListarTodos(int pageNumber, int pageSize)
        {
            return Ok(await service.ListarTodos(pageNumber, pageSize));
        }
        
        [HttpGet("matricula/{matricula}")]
        public async Task<IActionResult> BuscarUsuario(int matricula)
        {
            try
            {
                var res = await service.BuscarUsuario(matricula);
                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpGet("nome")]
        public async Task<IActionResult> BuscarUsuario(string nome)
        {
            try
            {
                var res = await service.BuscarUsuario(nome);
                return Ok(res);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("alterar-senha")]
        public async Task<IActionResult> AlterarSenha([FromBody] PasswordUpdate PasswordUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Dados invalidos");
            }
            try
            {
                return Ok(await service.AlterarSenha(PasswordUpdate));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("editar/{matricula}")]
        public async Task<IActionResult> EditarUsuario(int matricula, [FromBody] UsuarioUpdateIn usuarioIn)
        {
            try
            {
                return Ok(await service.EditarUsuario(matricula, usuarioIn));
            }
            catch (Exception e)
            {
                return BadRequest(new { Error = e.Message });
            }
        }
    }
}