using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.entity.usuario;
using eagletechapi.models.usuario;

namespace eagletechapi.dto.usuario
{
    public class UsuarioOut(Usuario usuario)
    {
        public int Matricula { get; set; } = usuario.Matricula;
        public string NomeCompleto { get; set; } = usuario.NomeCompleto;
        public string Telefone { get; set; } = usuario.Telefone;
        public Funcao Funcao { get; set; } = usuario.Funcao;
        public string Email { get; set; } = usuario.Email;
    }
}