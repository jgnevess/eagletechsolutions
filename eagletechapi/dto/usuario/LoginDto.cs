using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.dto.usuario
{
    public class LoginDto
    {

        /// <example>1</example>
        [Required]
        public int Matricula { get; set; } = 0;
        /// <example>SenhaSuperDificil123*</example>
        [Required]
        public string Senha { get; set; } = string.Empty;
    }
}