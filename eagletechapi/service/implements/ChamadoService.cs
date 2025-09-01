using System.ComponentModel.DataAnnotations;
using eagletechapi.Contexts;
using eagletechapi.dto.chamado;
using eagletechapi.entity.chamado.enums;
using eagletechapi.entity.usuario;
using eagletechapi.models;
using eagletechapi.models.chamado;
using eagletechapi.models.chamado.enums;
using eagletechapi.service.interfaces;
using Microsoft.EntityFrameworkCore;

namespace eagletechapi.service.implements
{
    public class ChamadoService(AppDbContext context) : IChamadoService
    {
        public async Task<ChamadoOut> AbrirChamado(ChamadoIn chamadoIn)
        {
            var solicitante = await context.Usuarios.FirstOrDefaultAsync(u => u.Matricula.Equals(chamadoIn.UsuarioId));
            var chamado = new Chamado(chamadoIn, solicitante!);

            var validationContext = new ValidationContext(chamado);
            Validator.ValidateObject(chamado, validationContext, true);

            var res = await context.Chamados.AddAsync(chamado);
            await context.SaveChangesAsync();

            return new ChamadoOut(res.Entity);
        }

        public async Task<ChamadoOut?> BuscarChamado(int numeroChamado)
        {
            var res = await context.Chamados
                .Include(c => c.Solicitante)
                .Include(c => c.Tecnico)
                .FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado) ?? throw new Exception("");
            return new ChamadoOut(res);

        }

        public async Task<IEnumerable<ChamadoOut>> BuscarChamadosSolicitante(Status status)
        {
            return await context.Chamados.Where(c => c.Status.Equals(status)).Select(c => new ChamadoOut(c)).ToListAsync();
        }

        public async Task<IEnumerable<ChamadoOut>> BuscarChamadosSolicitante(int usuarioId, Status status)
        {
            return await context.Chamados
                .Include(c => c.Solicitante)
                .Where(c => c.Status.Equals(status) && c.Solicitante.Matricula.Equals(usuarioId))
                .Select(c => new ChamadoOut(c))
                .ToListAsync();
        }

        public async Task<IEnumerable<ChamadoOut>> BuscarChamadosTecnico(int usuarioId, Status status)
        {
            return await context.Chamados
                .Include(c => c.Solicitante)
                .Include(c => c.Tecnico)
                .Where(c => c.Status.Equals(status) && c.Tecnico.Matricula.Equals(usuarioId))
                .Select(c => new ChamadoOut(c))
                .ToListAsync();
        }

        public async Task<IEnumerable<ChamadoOut>> BuscarChamadosTecnico(int usuarioId, Status status, DateTime abertura)
        {
            return await context.Chamados
                .Include(c => c.Solicitante)
                .Include(c => c.Tecnico)
                .Where(c => c.Status.Equals(status) && c.Tecnico.Matricula.Equals(usuarioId) && c.Abertura.Equals(abertura))
                .Select(c => new ChamadoOut(c))
                .ToListAsync();
        }

        public async Task<IEnumerable<ChamadoOut>> BuscarChamadosTecnico(int usuarioId, Status status, DateTime abertura, DateTime fechamento)
        {
            return await context.Chamados
                .Include(c => c.Solicitante)
                .Include(c => c.Tecnico)
                .Where(c => c.Status.Equals(status) &&
                            c.Tecnico.Matricula.Equals(usuarioId) &&
                            c.Abertura.Equals(abertura) &&
                            c.Fechamento.Equals(fechamento))
                .Select(c => new ChamadoOut(c))
                .ToListAsync();
        }

        public async Task<ChamadoOut?> EditarChamado(int numeroChamado, ChamadoIn chamadoIn)
        {
            var res = await context.Chamados.FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado);
            if (res == null) throw new Exception();
            res.Categoria = chamadoIn.Categoria;
            res.Descricao = chamadoIn.Descricao;
            res.Titulo = chamadoIn.Titulo;
            context.Update(res);
            await context.SaveChangesAsync();
            return new ChamadoOut(res);
        }

        public async Task<ChamadoOut?> AceitarChamado(int numeroChamado, int tecnicoId)
        {
            var chamado = await context.Chamados
                              .Include(c => c.Solicitante)
                              .FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado)
                          ?? throw new Exception("Chamado não encontrado");
            
            var tecnico = await context.Usuarios
                              .FirstOrDefaultAsync(u => u.Matricula == tecnicoId)
                          ?? throw new Exception("Técnico não encontrado");

            if (tecnico.Funcao != Funcao.TECNICO)
                throw new Exception("Não autorizado");
            chamado.AceitarChamado(tecnico);
            await context.SaveChangesAsync();
            return new ChamadoOut(chamado);
        }


        public async Task<ChamadoOut?> FecharChamado(int numeroChamado, int tecnicoId)
        {
            var chamado = await context.Chamados
                              .Include(c => c.Solicitante)
                              .Include(c => c.Tecnico)
                              .FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado)
                          ?? throw new Exception("Chamado não encontrado");
            
            var tecnico = await context.Usuarios
                              .FirstOrDefaultAsync(u => u.Matricula == tecnicoId)
                          ?? throw new Exception("Técnico não encontrado");
            
            if(!tecnico.Equals(chamado.Tecnico)) throw new Exception("Não autorizado");

            if (tecnico.Funcao != Funcao.TECNICO)
                throw new Exception("Não autorizado");
            if (chamado is not { Status: Status.EM_ANDAMENTO }) throw new Exception("Erro ao fechar o chamado");
            chamado.FecharChamado();
            await context.SaveChangesAsync();
            return new ChamadoOut(chamado);
        }

        public async Task DeletarChamado(int numeroChamado)
        {
            var res = await context.Chamados.FirstOrDefaultAsync(c => c.NumeroChamado == numeroChamado) ?? throw new Exception("Chamado nao encontrado");
            if (res.Status != Status.ABERTO) throw new Exception("O chamado não está aberto");
            context.Chamados.Remove(res);
            await context.SaveChangesAsync();
        }
    }
}