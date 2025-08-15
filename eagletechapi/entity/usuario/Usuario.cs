using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models.usuario
{
    public record Usuario([property: Key] int Matricula, string NomeCompleto, string Senha, string Telefone, Funcao Funcao)
    {
        public Usuario() : this(0, string.Empty, string.Empty, string.Empty, new Funcao()) { }


    }
}