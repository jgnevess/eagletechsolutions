using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using eagletechapi.Contexts;
using eagletechapi.dto.usuario;
using eagletechapi.entity.usuario;
using eagletechapi.service.implements;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Moq;
using Xunit;

namespace EagleTechApi.Tests
{
    public class AuthTest
    {

        private AppDbContext GetInMemoryDb()
        {
            var options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;
            return new AppDbContext(options);
        }

        private UsuarioIn CriarUsuario()
        {
            UsuarioIn usuarioIn = new()
            {
                NomeCompleto = "João Silva",
                Senha = "Senhapadrao1*",
                Telefone = "16993000000",
                Funcao = Funcao.ADMIN,
                Email = "joao@testeemail.com"
            };

            return usuarioIn;
        }

        [Fact]
        public async Task TestLoginReturntoken()
        {
            var usuarioIn = CriarUsuario();
            var context = GetInMemoryDb();
            var service = new UserService(context);
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(c => c["Jwt:Key"]).Returns((string?)"12345678901234567890123456789012");


            var auth = new AuthService(context, mockConfig.Object);

            await service.CadastrarUsuario(usuarioIn);
            var dto = new LoginDto()
            {
                Matricula = 1,
                Senha = "Senhapadrao1*"
            };

            var res = await auth.Login(dto);

            var handler = new JwtSecurityTokenHandler();
            var jwt = handler.ReadJwtToken((string) res.Token);

            Assert.Equal("joao@testeemail.com", jwt.Claims.First(c => c.Type == ClaimTypes.Name).Value);
            Assert.Equal("ADMIN", jwt.Claims.First(c => c.Type == ClaimTypes.Role).Value);
            Assert.False(string.IsNullOrEmpty((string) res.Token));
            Assert.Equal("ADMIN",(string) res.Role);
            Assert.True((bool) res.FirstLogin);
        }

        [Fact]
        public async Task TestLoginShouldThrowExeptionNotFoundUser()
        {
            var usuarioIn = CriarUsuario();
            var context = GetInMemoryDb();
            var service = new UserService(context);
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(c => c["Jwt:Key"]).Returns((string?)"12345678901234567890123456789012");


            var auth = new AuthService(context, mockConfig.Object);

            await service.CadastrarUsuario(usuarioIn);
            var dto = new LoginDto()
            {
                Matricula = 99,
                Senha = "Senhapadrao1*"
            };

            var ex = await Assert.ThrowsAsync<Exception>(() => auth.Login(dto));

            Assert.Equal("Usuario não encontrado, solicite o cadastro com um Administrador", ex.Message);
        }

        [Fact]
        public async Task TestLoginShouldThrowExeptionincorrectPassword()
        {
            var usuarioIn = CriarUsuario();
            var context = GetInMemoryDb();
            var service = new UserService(context);
            var mockConfig = new Mock<IConfiguration>();
            mockConfig.Setup(c => c["Jwt:Key"]).Returns((string?)"12345678901234567890123456789012");


            var auth = new AuthService(context, mockConfig.Object);

            await service.CadastrarUsuario(usuarioIn);
            var dto = new LoginDto()
            {
                Matricula = 1,
                Senha = "SenhaSuperDificil123"
            };

            var ex = await Assert.ThrowsAsync<Exception>(() => auth.Login(dto));

            Assert.Equal("Senha incorreta", ex.Message);
        }
    }
}