using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models
{
    public record Chatbot([property: Key] long Id, long NumeroChamado)
    {
        public ICollection<Message> Conversation { get; set; } = new List<Message>();

        public Chatbot() : this(0L, 0L) { }

    }
}