using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.chamado.enums;
using eagletechapi.models.chamado.enums;
using eagletechapi.models.usuario;

namespace eagletechapi.dto.chamado
{
    public class ChamadoOut
    {
        public long NumeroChamado { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public Status Status { get; set; }
        public Prioridade Prioridade { get; set; }
        public Categoria Categoria { get; set; }
        public DateTime Abertura { get; set; }
        public DateTime Fechamento { get; set; }
        public Usuario Solicitante { get; set; } = new();
        public Usuario Tecnico { get; set; } = new();
    }
}