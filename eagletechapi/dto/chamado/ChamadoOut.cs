using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.chamado.enums;
using eagletechapi.models.chamado;
using eagletechapi.models.chamado.enums;
using eagletechapi.models.usuario;

namespace eagletechapi.dto.chamado
{
    public class ChamadoOut(Chamado chamado)
    {
        public long NumeroChamado { get; set; } = chamado.NumeroChamado;
        public string Titulo { get; set; } = chamado.Titulo;
        public string Descricao { get; set; } = chamado.Descricao;
        public Status Status { get; set; } = chamado.Status;
        public Prioridade Prioridade { get; set; } = chamado.Prioridade;
        public Categoria Categoria { get; set; } = chamado.Categoria;
        public DateTime Abertura { get; set; } = chamado.Abertura;
        public DateTime Fechamento { get; set; } = chamado.Fechamento;
        public Usuario Solicitante { get; set; } = chamado.Solicitante;
        public Usuario Tecnico { get; set; } = chamado.Tecnico;
    }
}