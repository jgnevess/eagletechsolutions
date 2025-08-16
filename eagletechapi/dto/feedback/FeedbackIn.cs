using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.feedback.enums;
using eagletechapi.models.usuario;

namespace eagletechapi.dto.feedback
{
    public class FeedbackIn
    {
        public TipoFeedback TipoFeedback { get; set; }

        [Range(0, 5)]
        public int Avaliacao { get; set; }

        public DateTime DataHora { get; set; }
        public string Menssagem { get; set; } = string.Empty;
        public Usuario Usuario { get; set; } = new();
    }
}