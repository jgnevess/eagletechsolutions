using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.usuario;

namespace eagletechapi.dto.usuario
{
    public class UsuarioIn
    {
        public string NomeCompleto { get; set; } = string.Empty;
        public string Senha { get; set; } = string.Empty;
        public string Telefone { get; set; } = string.Empty;
        public Funcao Funcao { get; set; } = Funcao.SOLICITANTE;

    }
}