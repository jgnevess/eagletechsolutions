using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models
{
    public class ChatbotOut
    {
        public List<Candidate> candidates { get; set; } = [];
    }

    public class Candidate
    {
        public ChatbotContent content { get; set; } = new();
    }

}