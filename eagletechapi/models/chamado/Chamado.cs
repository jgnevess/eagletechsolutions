using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models.chamado
{
    public class Chamado
    {
        [Key]
        public long NumeroChamado { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }

        public Chatbot Chatbot { get; set; }

        public Chamado()
        {
            this.NumeroChamado = 0L;
            this.Titulo = string.Empty;
            this.Descricao = string.Empty;
            this.Chatbot = null;
        }
    }
}