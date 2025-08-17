using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.usuario;
using System.ComponentModel.DataAnnotations;


namespace eagletechapi.dto.usuario
{
    public class UsuarioIn
    {
        public string NomeCompleto { get; set; } = string.Empty;
        [StringLength(40, MinimumLength = 12, ErrorMessage = "A senha deve ter entre 12 e 40 caracteres")]
        public string Senha { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public Funcao Funcao { get; set; } = Funcao.SOLICITANTE;
        public string Email { get; set; } = string.Empty;

    }
}