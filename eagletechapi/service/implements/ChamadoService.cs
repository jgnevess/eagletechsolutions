using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.Contexts;
using eagletechapi.dto.chamado;
using eagletechapi.models;
using eagletechapi.models.chamado;
using eagletechapi.models.chamado.enums;
using eagletechapi.service.interfaces;
using eagletechapi.services;
using Microsoft.EntityFrameworkCore;

namespace eagletechapi.service
{
    public class ChamadoService(AppDbContext context, ChatbotService chatbotService) : IChamadoService
    {
        private readonly AppDbContext _context = context;
        private readonly ChatbotService _chatbot = chatbotService;

        public async Task<Chamado> CriarChamado(ChamadoIn chamadoIn)
        {
            Chatbot chatbot = await _chatbot.CriarChatbot();

            Chamado chamado = new()
            {
                Titulo = chamadoIn.Titulo,
                Descricao = chamadoIn.Descricao,
                Chatbot = chatbot
            };
            var res = await _context.AddAsync(chamado);
            await _context.SaveChangesAsync();

            chatbot.NumeroChamado = res.Entity.NumeroChamado;
            _context.Chatbots.Update(chatbot);

            await _context.SaveChangesAsync();

            return chamado;
        }

        public async Task<Chamado> BuscarTodosPorChamados(long numeroChamado)
        {
            return await _context.Chamados.Include(c => c.Chatbot)
                .ThenInclude(ch => ch.Conversation)
                .FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado) ?? throw new Exception();
        }

        public async Task<ChamadoOut> AbrirChamado(ChamadoIn chamadoIn)
        {
            var solicitante = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula.Equals(chamadoIn.UsuarioId));
            Chamado chamado = new Chamado(chamadoIn, solicitante!);

            var validationContext = new ValidationContext(chamado);
            Validator.ValidateObject(chamado, validationContext, true);

            var res = await _context.Chamados.AddAsync(chamado);
            await _context.SaveChangesAsync();

            return new ChamadoOut(res.Entity);
        }

        public Task<ChamadoOut?> BuscarChamado(int numeroChamado)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChamadoOut>> BuscarChamados()
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChamadoOut>> BuscarChamados(Status status)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChamadoOut>> BuscarChamados(int usuarioId, Status status)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChamadoOut>> BuscarChamados(int usuarioId, Status status, DateTime abertura)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChamadoOut>> BuscarChamados(int usuarioId, Status status, DateTime abertura, DateTime Fechamento)
        {
            throw new NotImplementedException();
        }

        public Task<ChamadoOut?> EditarChamado(int numeroChamado, ChamadoIn chamadoIn)
        {
            throw new NotImplementedException();
        }

        public Task<ChamadoOut?> AceitarChamado(int numeroChamado, int tecnicoId)
        {
            throw new NotImplementedException();
        }

        public Task<ChamadoOut?> FecharChamado(int numeroChamado, int tecnicoId)
        {
            throw new NotImplementedException();
        }

        public Task DeletarChamado(int numeroChamado)
        {
            throw new NotImplementedException();
        }
    }
}