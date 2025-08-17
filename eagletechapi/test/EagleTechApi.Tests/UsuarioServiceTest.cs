using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;
using Moq;
using eagletechapi.Contexts;
using Microsoft.EntityFrameworkCore;
using eagletechapi.models.usuario;
using eagletechapi.dto.usuario;
using eagletechapi.service.implements;
using System.ComponentModel.DataAnnotations;

namespace eagletechapi.test.service
{
    public class UsuarioServiceTest
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
                Senha = "SenhaSuperDificil123*",
                Telefone = "16993000000",
                Funcao = entity.usuario.Funcao.ADMIN,
                Email = "joao@testeemail.com"
            };

            return usuarioIn;
        }

        [Fact]
        public async Task CreateUserReturnSuccess()
        {
            var usuarioIn = CriarUsuario();
            var context = GetInMemoryDb();
            var service = new UserService(context);

            await service.CadastrarUsuario(usuarioIn);

            var res = await context.Usuarios.FindAsync(1);

            Assert.NotNull(res);
            Assert.Equal("João Silva", res.NomeCompleto);
            Assert.NotEqual("SenhaSuperDificil123*", res.Senha);
        }

        [Fact]
        public async Task CreateUserThrowExceptionName()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.NomeCompleto = "Jo";

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("O nome deve ter entre 3 e 40 caracteres", ex.Message);
        }

        [Fact]
        public async Task CreateUserThrowExceptionNameRequired()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.NomeCompleto = "";

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("O nome é obrigatório", ex.Message);
        }

        [Fact]
        public async Task CreateUserThrowExceptionEmail()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.Email = "Jo";

            Console.WriteLine(usuarioIn);

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("O email não é valido", ex.Message);
        }

        [Fact]
        public async Task CreateUserThrowExceptionEmailIsRequired()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.Email = "";

            Console.WriteLine(usuarioIn);

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("The Email field is required.", ex.Message);
        }

        [Fact]
        public async Task CreateUserThrowExceptionTelefone()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.Telefone = "123";

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("O telefone deve ter 11 caracteres", ex.Message);
        }

        [Fact]
        public async Task CreateUserThrowExceptionTelefoneIsRequired()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.Telefone = "";

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("The Telefone field is required.", ex.Message);
        }

        [Fact]
        public async Task CreateUserThrowExceptionTelefoneApenasNumeros()
        {
            var usuarioIn = CriarUsuario();
            usuarioIn.Telefone = "as112334321";

            var context = GetInMemoryDb();
            var service = new UserService(context);

            var ex = await Assert.ThrowsAsync<ValidationException>(() => service.CadastrarUsuario(usuarioIn));

            Assert.Equal("O telefone só pode conter números", ex.Message);
        }

        [Fact]
        public async Task FindAllUsersShouldReturnEmpityList()
        {
            var context = GetInMemoryDb();
            var service = new UserService(context);

            var res = await service.ListarTodos();

            Assert.Empty(res);
        }

        [Fact]
        public async Task FindAllUsersShouldReturnListWithItem()
        {
            var usuarioIn = CriarUsuario();
            var context = GetInMemoryDb();
            var service = new UserService(context);

            await service.CadastrarUsuario(usuarioIn);

            var res = await service.ListarTodos();

            Assert.NotEmpty(res);
        }
    }
}