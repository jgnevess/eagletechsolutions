using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.feedback.enums;
using eagletechapi.models.usuario;

namespace eagletechapi.entity.feedback
{
    public class Feedback
    {
        [Key]
        public int Id { get; set; }
        public TipoFeedback TipoFeedback { get; set; }

        [Range(0, 5)]
        public int Avaliacao { get; set; }

        public DateTime DataHora { get; set; }
        public string Menssagem { get; set; }
        public Usuario Usuario { get; set; }

        public Feedback()
        {
            this.Id = 0;
            this.Avaliacao = 0;
            this.TipoFeedback = TipoFeedback.ELOGIO;
            this.DataHora = DateTime.Now;
            this.Menssagem = string.Empty;
            this.Usuario = new();
        }

    }
}