using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models.usuario
{
    public class Usuario
    {
        [Key]
        public int Matricula { get; set; }
        public string NomeCompleto { get; set; }
        public string Senha { get; set; }
        public string Telefone { get; set; }
        public Funcao Funcao { get; set; }

        public Usuario()
        {
            this.Matricula = 0;
            this.NomeCompleto = string.Empty;
            this.Senha = string.Empty;
            this.Telefone = string.Empty;
            this.Funcao = new();
        }
    }
}