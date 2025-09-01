using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using eagletechapi.dto.chamado;
using eagletechapi.models.chamado.enums;

namespace eagletechapi.service.interfaces
{
    public interface IChamadoService
    {
        Task<ChamadoOut> AbrirChamado(ChamadoIn chamadoIn);
        Task<ChamadoOut?> BuscarChamado(int numeroChamado);
        Task<IEnumerable<ChamadoOut>> BuscarChamadosSolicitante(Status status);
        Task<IEnumerable<ChamadoOut>> BuscarChamadosSolicitante(int usuarioId, Status status);
        Task<IEnumerable<ChamadoOut>> BuscarChamadosTecnico(int usuarioId, Status status);
        Task<ChamadoOut?> EditarChamado(int numeroChamado, ChamadoIn chamadoIn);
        Task<ChamadoOut?> AceitarChamado(int numeroChamado, int tecnicoId);
        Task<ChamadoOut?> FecharChamado(int numeroChamado, int tecnicoId);
        Task DeletarChamado(int numeroChamado);
        

    }
}