using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.usuario;
using eagletechapi.service.interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace eagletechapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController(IAuthService service, IUserService userService) : ControllerBase
    {
        private readonly IAuthService _authService = service;
        private readonly IUserService _userService = userService;


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] CredentialsLogin dto)
        {
            if (!ModelState.IsValid) return BadRequest(new Dictionary<string, string>()
            {
                { "Error", "Preencher todos os dados" },
            });
            try
            {
                var res = await _authService.Login(dto);
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

        [HttpPost("register")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Register([FromBody] UserIn userIn)
        {
            if (!ModelState.IsValid) return BadRequest(new Dictionary<string, string>()
            {
                { "Error", "Preencher todos os dados" },
            });
            try
            {
                var res = await _userService.CadastrarUsuario(userIn);
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

        [HttpPut("update-password")]
        [Authorize]
        public async Task<IActionResult> UpdatePassword([FromBody] SimplePasswordUpdate passwordUpdate)
        {
            var res = await _userService.AlterarSenha(passwordUpdate);
            return Ok(res);
        }
    }
}