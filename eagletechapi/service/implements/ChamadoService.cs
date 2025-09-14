using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using eagletechapi.Contexts;
using eagletechapi.dto;
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
            
            chamado.Prioridade = await this.DefinirPrioidade(chamado.Descricao);
            
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

        public async Task<ResponseList<ChamadoOut>> BuscarChamadosSolicitante(Status status)
        {
            var chamados = await context.Chamados
                .Where(c => c.Status.Equals(status))
                .OrderBy(c => c.Prioridade)
                .Select(c => new ChamadoOut(c))
                .ToListAsync();

            var atendidos = await context.Chamados.Where(c => c.Status.Equals(Status.EM_ANDAMENTO)).CountAsync();
            var naoAtendidos = await context.Chamados.Where(c => c.Status.Equals(Status.ABERTO)).CountAsync();
            var resolvidos = await context.Chamados.Where(c => c.Status.Equals(Status.FECHADO)).CountAsync();
            
            var res = new ResponseList<ChamadoOut>
            {
                Data = chamados
            };
            res.Quantities.Add("atendidos", atendidos);
            res.Quantities.Add("naoAtendidos", naoAtendidos);
            res.Quantities.Add("resolvidos", resolvidos);

            return res;
        }

        public async Task<ResponseList<ChamadoOut>> BuscarChamadosSolicitante(int usuarioId, Status status)
        {
            var atendidos = await context.Chamados.Where(c => c.Status.Equals(Status.EM_ANDAMENTO) && c.Solicitante.Matricula.Equals(usuarioId)).CountAsync();
            var naoAtendidos = await context.Chamados.Where(c => c.Status.Equals(Status.ABERTO) && c.Solicitante.Matricula.Equals(usuarioId)).CountAsync();;
            var resolvidos = await context.Chamados.Where(c => c.Status.Equals(Status.FECHADO) && c.Solicitante.Matricula.Equals(usuarioId)).CountAsync();
            
            var chamados = await context.Chamados
                .Include(c => c.Solicitante)
                .Where(c => c.Status.Equals(status) && c.Solicitante.Matricula.Equals(usuarioId))
                .Select(c => new ChamadoOut(c))
                .ToListAsync();
            
            var res = new ResponseList<ChamadoOut>
            {
                Data = chamados
            };
            res.Quantities.Add("atendidos", atendidos);
            res.Quantities.Add("naoAtendidos", naoAtendidos);
            res.Quantities.Add("resolvidos", resolvidos);

            return res;
        }

        public async Task<ResponseList<ChamadoOut>> BuscarChamadosTecnico(int usuarioId, Status status)
        {
            var atendidos = await context.Chamados.Where(c => c.Status.Equals(Status.EM_ANDAMENTO) && c.Tecnico.Matricula.Equals(usuarioId)).CountAsync();
            var resolvidos = await context.Chamados.Where(c => c.Status.Equals(Status.FECHADO) && c.Tecnico.Matricula.Equals(usuarioId)).CountAsync();
            
            var chamados  = await context.Chamados
                .Include(c => c.Solicitante)
                .Include(c => c.Tecnico)
                .Where(c => c.Status.Equals(status) && c.Tecnico.Matricula.Equals(usuarioId))
                .Select(c => new ChamadoOut(c))
                .ToListAsync();
            
            var res = new ResponseList<ChamadoOut>
            {
                Data = chamados
            };
            res.Quantities.Add("atendidos", atendidos);
            res.Quantities.Add("resolvidos", resolvidos);

            return res;
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

        private async Task<Prioridade> DefinirPrioidade(string descricao)
        {
            using var http = new HttpClient();
            var config = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables()
                .Build();

            var apiKey = config["Gemini:ApiKey"];

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = $"Você tem que definir uma prioridade para um chamdo tecnico, então Defina a prioridade deste chamado: {descricao} (ALTA, MEDIA, BAIXA, CRITICA), apenas uma dessas palavras entre os parenteses, sem mais nada, tudo em uppercase"}
                        }
                    }
                }
            };
            
            http.DefaultRequestHeaders.Clear();
            http.DefaultRequestHeaders.Add("X-goog-api-key", apiKey);

            var response = await http.PostAsJsonAsync(
                "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
                requestBody
            );

            var json = await response.Content.ReadAsStringAsync();

            // pega só o texto da resposta
            using var doc = JsonDocument.Parse(json);
            var text = doc.RootElement
                .GetProperty("candidates")[0]
                .GetProperty("content")
                .GetProperty("parts")[0]
                .GetProperty("text")
                .GetString();

            Console.WriteLine($"[DEBUG] Gemini retornou: '{text}'");
            
            var prioridade = text?.Trim().ToUpperInvariant();

            return prioridade switch
            {
                "CRITICA" => Prioridade.CRITICA,
                "ALTA"    => Prioridade.ALTA,
                "MEDIA"   => Prioridade.MEDIA,
                "BAIXA"   => Prioridade.BAIXA,
                _         => throw new Exception($"Prioridade inválida retornada: '{prioridade}'")
            };
        }
    }
}