using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models.usuario
{
    public class Funcao
    {
        [Key]
        public int Id { get; set; }
        public string NomeFuncao { get; set; }

        public Funcao()
        {
            this.Id = 0;
            this.NomeFuncao = string.Empty;
        }

        
    }
}