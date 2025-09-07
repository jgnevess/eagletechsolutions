using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.usuario;
using eagletechapi.models.usuario;

namespace eagletechapi.service.interfaces
{
    public interface IUserService
    {
        Task<UsuarioOut> CadastrarUsuario(UsuarioIn usuarioIn);
        Task<UsuarioOut?> AlterarSenha(SimplePasswordUpdate simplePasswordUpdate);
        Task<UsuarioOut?> AlterarSenha(PasswordUpdate passwordUpdate);
        Task<List<Usuario>> ListarTodos(int pageNumber, int pageSize);
        Task<UsuarioOut?> BuscarUsuario(int matricula);
        Task<List<UsuarioOut>> BuscarUsuario(string nome);
        Task<UsuarioOut> EditarUsuario(int matricula, UsuarioUpdateIn usuarioIn);
        Task DeletarUsuario(int matricula);
    }
}