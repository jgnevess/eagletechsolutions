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
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var res = await _authService.Login(dto);
            return Ok(res);
        }

        [HttpPost("register")]
        [Authorize(Roles = "ADMIN")]
        public async Task<IActionResult> Register([FromBody] UsuarioIn usuarioIn)
        {
            var res = await _userService.CadastrarUsuario(usuarioIn);
            return Ok(res);
        }
    }
}