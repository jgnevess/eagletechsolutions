using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using eagletechapi.Contexts;
using eagletechapi.dto.usuario;
using eagletechapi.service.interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;


namespace eagletechapi.service.implements
{
    public class AuthService(AppDbContext context, IConfiguration configuration) : IAuthService
    {
        private readonly AppDbContext __context = context;
        private readonly IConfiguration __config = configuration;



        public async Task<string?> Login(LoginDto loginDto)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Email.Equals(loginDto.Email)) ??
            throw new Exception("Usuario não encontrado");

            if (!BCrypt.Net.BCrypt.Verify(loginDto.Senha, usuario.Senha)) throw new Exception("Senha incorreta");

            var claims = new[]
            {
                new Claim(ClaimTypes.Name, usuario.Email),
                new Claim(ClaimTypes.Role, usuario.Funcao.ToString())
            };


            string API_KEY = __config["Jwt:Key"] ?? "";

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(API_KEY));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(3),
                signingCredentials: creds
            );  

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}