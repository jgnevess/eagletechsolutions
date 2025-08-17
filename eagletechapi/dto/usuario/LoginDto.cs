using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.dto.usuario
{
    public class LoginDto
    {

        /// <example>joaoteste@teste.com</example>
        public string Email { get; set; } = string.Empty;
        /// <example>SenhaSuperDificil123*</example>
        public string Senha { get; set; } = string.Empty;
    }
}