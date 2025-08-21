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



        public async Task<Dictionary<string, string>> Login(LoginDto loginDto)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Matricula.Equals(loginDto.Matricula)) ??
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

            Dictionary<string, string> response = new()
            {
                { "Token", new JwtSecurityTokenHandler().WriteToken(token) },
                { "Role", usuario.Funcao.ToString() }
            };

            return response;
        }
    }
}