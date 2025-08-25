using System.Text.RegularExpressions;
using eagletechapi.Contexts;
using eagletechapi.http;
using eagletechapi.models;
using Microsoft.EntityFrameworkCore;

namespace eagletechapi.service.implements
{
    public class ChatbotService(ClientHttp clientHttp, IConfiguration config, AppDbContext context)
    {
        private readonly string _apiKey = config["Gemini:ApiKey"]!;
        private readonly string _apiUrl = config["Gemini:ApiUrl"]!;

        public async Task<Chatbot> CriarChatbot()
        {
            Chatbot chatbot = new()
            {
                Conversation = new List<Message>()
            };

            var res = await context.AddAsync(chatbot);
            await context.SaveChangesAsync();
            return res.Entity;
        }

        public async Task<Chatbot> Conversation(long numeroChamado)
        {
            var res = await context.Chatbots.Include(c => c.Conversation).FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado);
            return res ?? throw new Exception();
        }

        public async Task<IEnumerable<Message>> Conversation(long numeroChamado, ChatbotPart chatbotPart)
        {
            var chatbot = await context.Chatbots
                .Include(c => c.Conversation)
                .FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado);

            if (chatbot == null)
            {
                chatbot = await CriarChatbot();
                chatbot.NumeroChamado = numeroChamado;
            }

   
            chatbot.Conversation.Add(new Message
            {
                MessageType = MessageType.SENT,
                MessageText = chatbotPart.text
            });

        
            var chatbotIn = new ChatbotIn();

            
            if (chatbot.Conversation.Count == 1)
            {
                chatbotIn.contents.Add(new ChatbotContent
                {
                    parts = new List<ChatbotPart>
                    {
                        new ChatbotPart
                        {
                            text = "Você é um membro da equipe de suporte técnico de informática. Responda com frases curtas e diretas. Lembre-se que o usuário pode ser leigo no assunto. Sempre dê 3 sugestões do que pode ser feito."
                        }
                    }
                });
            }

            
            foreach (var msg in chatbot.Conversation)
            {
                chatbotIn.contents.Add(new ChatbotContent
                {
                    parts = new List<ChatbotPart>
                    {
                        new ChatbotPart { text = msg.MessageText }
                    }
                });
            }

            
            if (chatbot.Conversation.Count > 2)
            {
                switch (chatbotPart.text.ToLower())
                {
                    case "sim":
                        chatbot.Conversation.Add(new Message
                        {
                            MessageType = MessageType.RECEIVED,
                            MessageText = "Seu chamado foi encerrado"
                        });
                        break;
                    case "não":
                        chatbot.Conversation.Add(new Message
                        {
                            MessageType = MessageType.RECEIVED,
                            MessageText = "Seu chamado será aberto e um técnico já vai atendê-lo"
                        });
                        // TODO: ABRIR CHAMADO 

                        


                        break;
                    default:
                        await ChatResponse(chatbotIn, chatbot);
                        chatbot.Conversation.Add(new Message
                        {
                            MessageType = MessageType.SOLVED,
                            MessageText = "Essa conversa resolveu seu problema?"
                        });
                        break;
                }
            }
            else
            {
                await ChatResponse(chatbotIn, chatbot);
            }

            context.Update(chatbot);
            await context.SaveChangesAsync();

            return chatbot.Conversation;
        }


        private async Task ChatResponse(ChatbotIn chatbotIn, Chatbot chatbot)
        {
            var response = await clientHttp.Enviar(_apiUrl, chatbotIn, _apiKey);

            var chatbotOut = await response.Content.ReadFromJsonAsync<ChatbotOut>();
            var respostaTexto = chatbotOut?.candidates?.FirstOrDefault()?.content?.parts?.FirstOrDefault()?.text;

            if (!string.IsNullOrWhiteSpace(respostaTexto))
            {
                respostaTexto = Regex.Replace(respostaTexto, @"\*\*(.*?)\*\*", "$1");
                chatbot.Conversation.Add(new Message
                {
                    MessageType = MessageType.RECEIVED,
                    MessageText = respostaTexto
                });
            }
        }
    }

}