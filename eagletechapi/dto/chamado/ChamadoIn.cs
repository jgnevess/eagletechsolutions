using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.chamado.enums;
using eagletechapi.models.chamado;

namespace eagletechapi.dto.chamado
{
    public class ChamadoIn
    {
        [Required(ErrorMessage = "O titulo é obrigatorio")]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "O Titulo deve ter entre 3 e 40 caracteres")]
        public string Titulo { get; set; } = string.Empty;
        [Required(ErrorMessage = "A descricao é obrigatoria")]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "O Titulo deve ter entre 3 e 40 caracteres")]
        
        public string Descricao { get; set; } = string.Empty;
        [Required(ErrorMessage = "A categoria é obrigatoria")]
        public Categoria Categoria { get; set; } = Categoria.OUTROS;
        [Required(ErrorMessage = "A matricula do solicitante é obrigatoria")]
        public int UsuarioId { get; set; } = 0;
    }
}