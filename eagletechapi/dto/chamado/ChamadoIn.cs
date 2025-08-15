using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.models.chamado;

namespace eagletechapi.dto.chamado
{
    public class ChamadoIn
    {
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public Categoria Categoria { get; set; } = new Categoria();
    }
}