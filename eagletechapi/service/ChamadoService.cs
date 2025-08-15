using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.Contexts;
using eagletechapi.dto.chamado;
using eagletechapi.models;
using eagletechapi.models.chamado;
using eagletechapi.services;
using Microsoft.EntityFrameworkCore;

namespace eagletechapi.service
{
    public class ChamadoService(AppDbContext context, ChatbotService chatbotService)
    {
        private readonly AppDbContext __context = context;
        private readonly ChatbotService __chatbot = chatbotService;

        public async Task<Chamado> CriarChamado(ChamadoIn chamadoIn)
        {
            Chatbot chatbot = await __chatbot.CriarChatbot();

            Chamado chamado = new()
            {
                Titulo = chamadoIn.Titulo,
                Descricao = chamadoIn.Descricao,
                Chatbot = chatbot
            };
            var res = await __context.AddAsync(chamado);
            await __context.SaveChangesAsync();

            chatbot.NumeroChamado = res.Entity.NumeroChamado;
            __context.Chatbots.Update(chatbot);

            await __context.SaveChangesAsync();

            return chamado;
        }

        public async Task<Chamado> BuscarTodosPorChamados(long numeroChamado)
        {
            return await __context.Chamados.Include(c => c.Chatbot)
                .ThenInclude(ch => ch.Conversation)
                .FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado) ?? throw new Exception();
        }
    }
}