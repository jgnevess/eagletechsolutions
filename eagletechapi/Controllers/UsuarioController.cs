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
        private readonly IUserService _service = service;



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
                var res = await _service.AlterarSenha(simplePasswordUpdate);
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
    }
}