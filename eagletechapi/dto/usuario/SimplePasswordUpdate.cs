using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.dto.usuario
{
    public class SimplePasswordUpdate
    {
        public int Matricula { get; set; } = 0;
        [StringLength(40, MinimumLength = 12, ErrorMessage = "A senha deve ter entre 12 e 40 caracteres")]
        [
            RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^a-zA-Z0-9]).{8,}$",
            ErrorMessage = "A senha deve conter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.")
        ]
        public string SenhaNova { get; set; } = string.Empty;
        public string ConfirmacaoNova { get; set; } = string.Empty;

        public SimplePasswordUpdate(int Matricula, string SenhaNova, string ConfirmacaoNova)
        {
            this.Matricula = Matricula;
            this.SenhaNova = SenhaNova;
            this.ConfirmacaoNova = ConfirmacaoNova;
        }
    }
}