using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.usuario;

namespace eagletechapi.service.interfaces
{
    public interface IUserService
    {
        Task<UsuarioOut> CadastrarUsuario(UsuarioIn usuarioIn);
        Task<UsuarioOut> AlterarSenha(string novaSenha);
        Task<IEnumerable<UsuarioOut>> ListarTodos();
        Task<UsuarioOut?> BuscarUsuario(int matricula);
        Task<UsuarioOut?> BuscarUsuario(string nome);
        Task<UsuarioOut> EditarUsuario(int matricula, UsuarioIn usuarioIn);
        Task DeletarUsuario(int matricula);
    }
}