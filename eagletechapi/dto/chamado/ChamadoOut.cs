using System;
using eagletechapi.dto.usuario;
using eagletechapi.entity.chamado.enums;
using eagletechapi.models.chamado;
using eagletechapi.models.chamado.enums;

namespace eagletechapi.dto.chamado
{
    public class ChamadoOut
    {
        public long NumeroChamado { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public Status Status { get; set; }
        public Prioridade Prioridade { get; set; }
        public Categoria Categoria { get; set; }
        public DateTime Abertura { get; set; }
        public DateTime Fechamento { get; set; }
        public UsuarioOut Solicitante { get; set; }
        public UsuarioOut? Tecnico { get; set; }

        public ChamadoOut(Chamado chamado)
        {
            NumeroChamado = chamado.NumeroChamado;
            Titulo = chamado.Titulo;
            Descricao = chamado.Descricao;
            Status = chamado.Status;
            Prioridade = chamado.Prioridade;
            Categoria = chamado.Categoria;
            Abertura = chamado.Abertura;
            Fechamento = chamado.Fechamento;
            Solicitante = chamado.Solicitante != null ? new UsuarioOut(chamado.Solicitante) : null!;
            Tecnico = chamado.Tecnico != null ? new UsuarioOut(chamado.Tecnico) : null;
        }
    }
}
