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
        public ICollection<Message> Conversation { get; set; }

        public Chatbot()
        {
            this.Id = 0;
            this.NumeroChamado = 0;
            this.Conversation = new List<Message>();
        }   
    }
}