using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.Contexts;
using eagletechapi.dto.chamado;
using eagletechapi.dto.usuario;
using eagletechapi.entity.chamado.enums;
using eagletechapi.entity.usuario;
using eagletechapi.http;
using eagletechapi.models.usuario;
using eagletechapi.service;
using eagletechapi.services;
using Microsoft.EntityFrameworkCore;
using Xunit;
using Microsoft.Extensions.Configuration;
using eagletechapi.models.chamado.enums;


namespace EagleTechApi.Tests
{
    public class ChamadoTest
    {

        private ChamadoIn CriarChamado(Usuario usuario)
        {
            var chamadoIn = new ChamadoIn()
            {
                Titulo = "Internet lenta",
                Descricao = "Minha internet está lenta",
                Categoria = Categoria.REDE,
                UsuarioId = usuario.Matricula
            };
            return chamadoIn;
        }

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
                Funcao = Funcao.SOLICITANTE,
                Email = "joao@testeemail.com"
            };
            return usuarioIn;
        }

        private IConfiguration CriarConfig()
        {
            var inMemorySettings = new Dictionary<string, string?>
            {
                {"Gemini:ApiKey", "fake-key"},
                {"Gemini:ApiUrl", "https://fake-url.com"}
            };

            return new ConfigurationBuilder()
                .AddInMemoryCollection(inMemorySettings!)
                .Build();
        }


        [Fact]
        public async Task CreateChamadoShouldReturnSuccess()
        {
            var usuario = CriarUsuario();
            var context = GetInMemoryDb();
            var u = new Usuario(usuario);
            var us = context.Usuarios.Add(u);
            await context.SaveChangesAsync();
            var chatbotService = new ChatbotService(new ClientHttp(), CriarConfig(), context);
            var service = new ChamadoService(context, chatbotService);

            var res = await service.AbrirChamado(CriarChamado(us.Entity));

            Assert.NotNull(res);
            Assert.Equal("Internet lenta", res.Titulo);
            Assert.Equal("Minha internet está lenta", res.Descricao);
            Assert.Equal(Categoria.REDE, res.Categoria);
            Assert.Equal("João Silva", res.Solicitante.NomeCompleto);
            Assert.Equal(Status.ABERTO, res.Status);
            Assert.NotNull(res.Abertura);

        }
    }
}