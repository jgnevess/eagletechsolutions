using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.http;
using eagletechapi.models;

namespace eagletechapi.services
{
    public class ChatbotService
    {
        private readonly string API_KEY;


        private readonly ClientHttp _http;

        public ChatbotService(ClientHttp clientHttp, IConfiguration config)
        {
            this._http = clientHttp;
            this.API_KEY = config["Gemini:ApiKey"];
        }

        public async Task<IEnumerable<Message>> Conversation(ChatbotPart chatbotPart)
        {
            
            Chatbot.Conversation.Add(new Message
            {
                MessageType = MessageType.SENT,
                MessageText = chatbotPart.text
            });

            var chatbotIn = new ChatbotIn();
            var chatbotContent = new ChatbotContent();

        
            if (Chatbot.Conversation.Count == 1)
            {
                chatbotContent.parts.Add(new ChatbotPart
                {
                    text = "Você é um membro da equipe de suporte técnico de informática. Responda com frases curtas, diretas lembrando sempre que o usuário pode ser leigo no assunto."
                });
            }

            chatbotContent.parts.Add(chatbotPart);
            chatbotIn.contents.Add(chatbotContent);

            if (Chatbot.Conversation.Count > 1 && chatbotPart.text.ToLower().Equals("sim"))
            {
                //TODO: FECHAR CHAMADO
            } 
            else 
            {
                //TODO: ABRIR CHAMADO
            }
        
            var response = await _http.Enviar(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                chatbotIn,
                API_KEY
            );

    
            var chatbotOut = await response.Content.ReadFromJsonAsync<ChatbotOut>();
            var respostaTexto = chatbotOut?.candidates?.FirstOrDefault()?.content?.parts?.FirstOrDefault()?.text;

    
            if (!string.IsNullOrWhiteSpace(respostaTexto))
            {
                Chatbot.Conversation.Add(new Message
                {
                    MessageType = MessageType.RECEIVED,
                    MessageText = respostaTexto
                });
            }

            return Chatbot.Conversation;
        }


    }
}