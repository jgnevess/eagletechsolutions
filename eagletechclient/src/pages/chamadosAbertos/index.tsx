import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { ChamadoDatails, handleChamadosAbertos, handleChamadosByMatricula } from "../../service/chamado";
import { useNavigate } from "react-router-dom";
import TabelaChamados from "../../components/tabelaChamados";
import { useFirstLogin } from "../../hooks/useFirstLogin";


const ChamadosAbertos = () => {
    useFirstLogin();
    const [chamados, setChamados] = useState<ChamadoDatails[]>();
    const navigate = useNavigate();

    useEffect(() => {

        handleChamadosAbertos().then(response => {
            if (response.status !== 200) {
                // navigate('/sol')
            }
            else {
                const chamados = response.data as ChamadoDatails[]
                setChamados(chamados);
            }
        })
    }, [])


    return (
        <Container>
            <div className="d-flex flex-column justify-content-start w-100" style={{ height: '100vh' }}>
                <TabelaChamados chamados={chamados!} />
            </div>
        </Container>
    )
}

export default ChamadosAbertos;