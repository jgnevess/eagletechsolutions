using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.Contexts;
using eagletechapi.dto.usuario;
using eagletechapi.models.usuario;
using eagletechapi.service.interfaces;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;


namespace eagletechapi.service.implements
{
    public class UserService(AppDbContext context) : IUserService
    {

        private readonly AppDbContext __context = context;

        public Task<UsuarioOut> AlterarSenha(string novaSenha)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioOut?> BuscarUsuario(int matricula)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioOut?> BuscarUsuario(string nome)
        {
            throw new NotImplementedException();
        }

        public async Task<UsuarioOut> CadastrarUsuario(UsuarioIn usuarioIn)
        {
            Usuario usuario = new(usuarioIn);

            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            var res = await __context.AddAsync(usuario);
            await __context.SaveChangesAsync();
            return new UsuarioOut(res.Entity);
        }

        public Task DeletarUsuario(int matricula)
        {
            throw new NotImplementedException();
        }

        public Task<UsuarioOut> EditarUsuario(int matricula, UsuarioIn usuarioIn)
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<UsuarioOut>> ListarTodos()
        {
            return await __context.Usuarios.Select(u => new UsuarioOut(u)).ToListAsync();
        }
    }
}