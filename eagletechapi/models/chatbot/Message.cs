using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace eagletechapi.models
{
    public class Message
    {

        [Key]
        public long Id { get; set; }
        public MessageType MessageType { get; set; }
        public string MessageText { get; set; }

        public long ChatbotId { get; set; }

        [JsonIgnore]
        public Chatbot Chatbot { get; set; } = new();


        public Message()
        {
            this.MessageType = MessageType.NULL;
            this.MessageText = string.Empty;
        }
    }
}