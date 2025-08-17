using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.usuario;
using eagletechapi.entity.usuario;

namespace eagletechapi.models.usuario
{
    public class Usuario
    {
        [Key]
        public int Matricula { get; set; }

        [Required(ErrorMessage = "O nome é obrigatório")]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "O nome deve ter entre 3 e 40 caracteres")]
        [RegularExpression("^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$", ErrorMessage = "O nome só pode conter letras")]
        public string NomeCompleto { get; set; }

        [Required]
        public string Senha { get; set; }
        [Required]
        [StringLength(11, MinimumLength = 11, ErrorMessage = "O telefone deve ter 11 caracteres")]
        [RegularExpression("^[0-9]+$", ErrorMessage = "O telefone só pode conter números")]
        public string Telefone { get; set; }
        [Required]
        public Funcao Funcao { get; set; }
        [Required]
        [EmailAddress(ErrorMessage = "O email não é valido")]
        public string Email { get; set; }

        public Usuario()
        {
            this.Matricula = 0;
            this.NomeCompleto = string.Empty;
            this.Senha = string.Empty;
            this.Telefone = string.Empty;
            this.Funcao = Funcao.SOLICITANTE;
            this.Email = string.Empty;
        }

        public Usuario(UsuarioIn usuarioIn)
        {
            this.NomeCompleto = usuarioIn.NomeCompleto;
            this.Senha = BCrypt.Net.BCrypt.HashPassword(usuarioIn.Senha);
            this.Telefone = usuarioIn.Telefone;
            this.Funcao = usuarioIn.Funcao;
            this.Email = usuarioIn.Email;
        }
    }
}