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

        private readonly AppDbContext _context = context;

        
        // Método de alterar a senha padrao so sistema
        public async Task<UserOut?> AlterarSenha(SimplePasswordUpdate simplePasswordUpdate)
        {
            // Primeira alteração de senha após o cadastro
            // A matricula sera recebida pela classe SimplePasswordUpdate
            var matricula = simplePasswordUpdate.Matricula;

            // Será testado se as senhas recebidas são iguais, a senha e a confimação
            // caso forem diferentes lança uma exceção
            // caso igual atribui a uma variavel
            
            if (!simplePasswordUpdate.NewPassword.Equals(simplePasswordUpdate.ConfirmNewPassword)) {
                throw new Exception("Senhas não são iguais");
            }
            var novaSenha = simplePasswordUpdate.NewPassword;

            // Busca no banco de dados se tem algum usuário com essa matricula
            // caso não encontrar lança uma exceção
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");

            // faz o hash da nova senha e altera a propiedade de primeiro login
            
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(novaSenha);
            usuario.FirstLogin = false;
            
            // Faz a validação da entidade
            
            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            // salva o banco de dados e retorna uma classe de userOut
            
            _context.Update(usuario);
            await _context.SaveChangesAsync();
            return new UserOut(usuario);
        }

        // Método de alterar senha
        public async Task<UserOut?> AlterarSenha(PasswordUpdate passwordUpdate)
        {
            // Recebe os dados da classe PasswordUpdate e atribui a variaveis
            var matricula = passwordUpdate.Matricula;
            var novaSenha = passwordUpdate.NewPassword;
            var senhaAntiga = passwordUpdate.OldPassword;
            
            // Busca no banco de dados se tem algum usuário com essa matricula
            // caso não encontrar lança uma exceção
            
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");

            // Compara se a senha é igual a anterior
            if (BCrypt.Net.BCrypt.Verify(novaSenha, usuario.Senha)) throw new Exception("A nova senha precisa ser diferente da antiga");
            
            // Verifica a senha antiga
            if (!BCrypt.Net.BCrypt.Verify(senhaAntiga, usuario.Senha)) throw new Exception("Senha incorreta");
            
            // Compara a senha com a vonfirmação
            if (!novaSenha.Equals(passwordUpdate.ConfirmNewPassword)) throw new Exception("Senhas não são iguais");
            
            // Faz o hash da nova senha
            
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword(novaSenha);

            // Faz a validação da entidade
            
            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            // salva o banco de dados e retorna uma classe de userOut
            
            _context.Update(usuario);
            await _context.SaveChangesAsync();
            return new UserOut(usuario);
        }

        // Método de buscar Usuário pela matricula
        public async Task<UserOut?> BuscarUsuario(int matricula)
        {
            // Busca no banco de dados se existe algum usuário com a matricula
            // Igual a matricula que foi passada por parametro e atribui a uma variavel a resposta
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula);
            
            // caso a variavel for nula lança uma exceção
            // caso não nula, atribui os valores a uma classe UserOut e retorna essa classe
            return usuario == null ? throw new Exception("Usuario não encontrado") : new UserOut(usuario);
        }

        // Busca uma lista de usuários pelo seu nome
        public async Task<List<UserOut>> BuscarUsuario(string nome)
        {
            // Linq usado para buscar apenas os usuários que o nome contem a sequencia de caracteres "nome" recebida por parametro
            
            return await context.Usuarios
                .AsNoTracking()
                .Where(u => u.NomeCompleto.Contains(nome))
                .Select(u => new UserOut(u))
                .ToListAsync();
        }

        // Cadastrando usuário
        public async Task<UserOut> CadastrarUsuario(UserIn userIn)
        {
            // Uma variavel do tipo usuário vai receber os dados recebidos via parametro
            // Uma senha padrão será atribuida ao usuário
            // Propiedade de primeiro login setada como verdadeiro
            
            Usuario usuario = new(userIn, "Senhapadrao1*")
            {
                FirstLogin = true
            };
            
            // Faz a validação da entidade

            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            // Busca se esse email já está cadastrado
            
            if (await _context.Usuarios.AnyAsync(u => u.Email == usuario.Email)) throw new Exception("Email já cadastrado");

            // salva no banco de dados o novo usuário e retorna uma classe UserOut
            
            var res = await _context.AddAsync(usuario);
            await _context.SaveChangesAsync();
            return new UserOut(res.Entity);
        }

        public async Task DeletarUsuario(int matricula)
        {
            // busca se o usuario existe no banco de dados
            // caso não encontrar lança uma exceção
            
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            
            // muda o status ativo para false
            // isso vai bloquear o login
            
            usuario.Ativo = false;
            _context.Update(usuario);
            await _context.SaveChangesAsync();
            
            // metodo sem retorno
        }

        public async Task AtivarUsuario(int matricula)
        {
            // busca se o usuario existe no banco de dados
            // caso não encontrar lança uma exceção
            
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            
            // muda o status ativo para true
            // isso vai liberar o login
            
            usuario.Ativo = true;
            _context.Update(usuario);
            await _context.SaveChangesAsync();
            
            // metodo sem retorno
        }

        public async Task<UserOut?> ResetPassword(int matricula)
        {
            // busca se o usuario existe no banco de dados
            // caso não encontrar lança uma exceção
            
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            
            // faz o hash e atualiza o primeiro login
            
            usuario.Senha = BCrypt.Net.BCrypt.HashPassword("Senhapadrao1*");
            usuario.FirstLogin = true;
            
            // faz a validação
            
            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            // salva no banco e retorna a resposta
            
            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();
            return new UserOut(usuario);
        }

        public async Task<UserOut> EditarUsuario(int matricula, UserUpdateIn userIn)
        {
            // busca se o usuario existe no banco de dados
            // caso não encontrar lança uma exceção
            
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Matricula == matricula) ?? throw new Exception("Usuario não encontrado");
            
            // atribui os valores recebido a entidade recebida do banco de dados
            
            usuario.NomeCompleto = userIn.NomeCompleto;
            usuario.Telefone = userIn.Telefone;
            usuario.Funcao = userIn.Funcao;
            usuario.Email = userIn.Email;

            // faz a validação
            
            var validationContext = new ValidationContext(usuario);
            Validator.ValidateObject(usuario, validationContext, true);

            // salva no banco e retorna a resposta
            
            _context.Usuarios.Update(usuario);
            await _context.SaveChangesAsync();
            return new UserOut(usuario);
        }

        public async Task<List<Usuario>> ListarTodos(int pageNumber, int pageSize)
        {
            return await context.Usuarios.OrderBy(u => u.Matricula).Skip((pageNumber - 1) * pageSize).Take(pageSize).ToListAsync();
        }
    }
}