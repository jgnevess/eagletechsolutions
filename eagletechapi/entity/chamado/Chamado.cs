using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.chamado;
using eagletechapi.models.chamado.enums;
using eagletechapi.models.usuario;

namespace eagletechapi.models.chamado
{
    public class Chamado
    {
        [Key]
        public long NumeroChamado { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public Status Status { get; set; }
        public Prioridade Prioridade { get; set; }
        public Categoria Categoria { get; set; }
        public DateTime Abertura { get; set; }
        public DateTime Fechamento { get; set; }
        public Chatbot Chatbot { get; set; }
        public Usuario Solicitante { get; set; }
        public Usuario Tecnico { get; set; }

        public Chamado()
        {
            this.NumeroChamado = 0L;
            this.Titulo = string.Empty;
            this.Descricao = string.Empty;
            this.Status = Status.ABERTO;
            this.Prioridade = Prioridade.BAIXA;
            this.Categoria = new Categoria();
            this.Abertura = DateTime.Now;
            this.Fechamento = DateTime.Now;
            this.Chatbot = new Chatbot();
            this.Solicitante = new Usuario();
            this.Tecnico = new Usuario();
        }

        public Chamado(ChamadoIn chamadoIn)
        {
            this.NumeroChamado = 0L;
            this.Titulo = chamadoIn.Titulo;
            this.Descricao = chamadoIn.Descricao;
            this.Status = Status.ABERTO;
            this.Prioridade = Prioridade.BAIXA;
            this.Categoria = chamadoIn.Categoria;
            this.Abertura = DateTime.Now;
            this.Fechamento = DateTime.Now;
            this.Chatbot = new Chatbot();
            this.Solicitante = new Usuario();
            this.Tecnico = new Usuario();
        }

        public void AceitarChamado(Usuario tecnico)
        {
            this.Status = Status.EM_ANDAMENTO;
            this.Tecnico = tecnico;
        }

        public void FecharChamado()
        {
            this.Fechamento = DateTime.Now;
            this.Status = Status.FECHADO;
        }

        
    }
}