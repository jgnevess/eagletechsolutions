using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace eagletechapi.dto.usuario
{
    public class PasswordUpdate
    {
        public int Matricula { get; set; } = 0;
        public string SenhaAntiga { get; set; } = string.Empty;
        public string SenhaNova { get; set; } = string.Empty;
        public string ConfirmacaoNova { get; set; } = string.Empty;

        public PasswordUpdate(int Matricula, string SenhaAntiga, string SenhaNova, string ConfirmacaoNova)
        {
            this.Matricula = Matricula;
            this.SenhaAntiga = SenhaAntiga;
            this.SenhaNova = SenhaNova;
            this.ConfirmacaoNova = ConfirmacaoNova;
        }
    }
}