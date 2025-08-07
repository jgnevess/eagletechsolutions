using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models
{
    public class Message
    {
        public MessageType MessageType { get; set; }
        public string MessageText { get; set; }

        public Message()
        {
            this.MessageType = MessageType.NULL;
            this.MessageText = string.Empty;
        }
    }
}