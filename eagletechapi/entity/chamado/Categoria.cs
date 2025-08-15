using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.models.chamado
{
    public class Categoria
    {
        public int Id { get; set; }
        public string NomeCategoria { get; set; }

        public Categoria()
        {
            this.Id = 0;
            this.NomeCategoria = string.Empty;
        }

        public Categoria(string NomeCategoria)
        {
            this.Id = 0;
            this.NomeCategoria = NomeCategoria;
        }
    }
}