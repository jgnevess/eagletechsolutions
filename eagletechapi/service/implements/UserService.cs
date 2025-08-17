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

        public async Task<UsuarioOut?> AlterarSenha(int matricula, string novaSenha)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(novaSenha);
            __context.Update(usuario);
            await __context.SaveChangesAsync();
            return new UsuarioOut(usuario);
        }

        public async Task<UsuarioOut?> AlterarSenha(int matricula, string novaSenha, string senhaAntiga)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            if (BCrypt.Net.BCrypt.Verify(novaSenha, usuario.Senha)) throw new Exception("A nova senha precisa ser diferente da antiga");
            if (!BCrypt.Net.BCrypt.Verify(senhaAntiga, usuario.Senha)) throw new Exception("Senha incorreta");
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(novaSenha);
            __context.Update(usuario);
            await __context.SaveChangesAsync();
            return new UsuarioOut(usuario);
        }

        public async Task<UsuarioOut?> BuscarUsuario(int matricula)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula);
            if (usuario == null) return null;
            return new UsuarioOut(usuario);
        }

        public async Task<UsuarioOut?> BuscarUsuario(string nome)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.NomeCompleto.Contains(nome, StringComparison.CurrentCultureIgnoreCase));
            if (usuario == null) return null;
            return new UsuarioOut(usuario);
        }

        public async Task<UsuarioOut> CadastrarUsuario(UsuarioIn usuarioIn)
        {
            Usuario usuario = new(usuarioIn);

            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            if (await __context.Usuarios.AnyAsync(u => u.Email == usuario.Email)) throw new Exception("Email já cadastrado");

            var res = await __context.AddAsync(usuario);
            await __context.SaveChangesAsync();
            return new UsuarioOut(res.Entity);
        }

        public async Task DeletarUsuario(int matricula)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            __context.Usuarios.Remove(usuario);
            await __context.SaveChangesAsync();
        }

        public async Task<UsuarioOut> EditarUsuario(int matricula, UsuarioUpdateIn usuarioIn)
        {
            var usuario = await __context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            usuario.NomeCompleto = usuarioIn.NomeCompleto;
            usuario.Telefone = usuarioIn.Telefone;
            usuario.Funcao = usuarioIn.Funcao;
            usuario.Email = usuarioIn.Email;

            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            __context.Usuarios.Update(usuario);
            await __context.SaveChangesAsync();
            return new UsuarioOut(usuario);
        }

        public async Task<IEnumerable<UsuarioOut>> ListarTodos()
        {
            return await __context.Usuarios.Select(u => new UsuarioOut(u)).ToListAsync();
        }
    }
}