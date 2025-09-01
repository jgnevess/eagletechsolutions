import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { ChamadoDatails, handleChamadosByMatricula, handleChamadosByMatriculaTecnico, Status } from "../../service/chamado";
import { useNavigate } from "react-router-dom";
import TabelaChamados from "../../components/tabelaChamados";


const ChamadosAtendidos = () => {

    const [chamados, setChamados] = useState<ChamadoDatails[]>();
    const [status, setStatus] = useState("EM_ANDAMENTO")

    const navigate = useNavigate();

    useEffect(() => {

        const matricula = Number.parseInt(sessionStorage.getItem("matricula")!);

        handleChamadosByMatriculaTecnico(matricula, status).then(response => {
            if (response.status !== 200) {
                navigate('/tec')
            }
            else {
                const chamados = response.data as ChamadoDatails[]
                setChamados(chamados);
            }
        })
    }, [status])


    return (
        <Container>
            <>
                <div className="d-flex justify-content-around w-100">
                    <div className="form-check">
                        <input onChange={(e) => setStatus(e.target.value)} className="form-check-input" type="radio" name="status" id="Em_Andamento" value="EM_ANDAMENTO" checked={status === 'EM_ANDAMENTO'}/>
                        <label className="form-check-label" htmlFor="Em_Andamento">
                            Em Andamento
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={(e) => setStatus(e.target.value)} className="form-check-input" type="radio" name="status" id="Fechado" value="FECHADO" checked={status === 'FECHADO'}/>
                        <label className="form-check-label" htmlFor="Fechado">
                            Fechado
                        </label>
                    </div>
                </div>
                <TabelaChamados chamados={chamados!} />
            </>

        </Container>
    )
}

export default ChamadosAtendidos;