using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models
{
    public class Chatbot
    {
        [Key]
        public long Id { get; set; }

        public long NumeroChamado { get; set; }
        public ICollection<Message> Conversation { get; set; } = new List<Message>();

    }
}