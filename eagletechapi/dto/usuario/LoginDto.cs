using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.dto.usuario
{
    public class LoginDto
    {
        [Required]
        public int Matricula { get; set; } = 0;
        
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}