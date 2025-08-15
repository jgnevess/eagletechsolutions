using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models
{
    public class ChatbotIn
    {
        public List<ChatbotContent> contents { get; set; } = new();
    }

    public class ChatbotContent
    {
        public List<ChatbotPart> parts { get; set; } = new();
        public string role { get; set; } = "user";
    }

    public class ChatbotPart
    {
        public string text { get; set; } = string.Empty;
    }

}