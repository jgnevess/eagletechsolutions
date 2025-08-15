using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models.usuario
{
    public record Funcao([property: Key] int Id, string NomeFuncao)
    {
        public Funcao() : this(0, string.Empty)
        {
        }


    }
}