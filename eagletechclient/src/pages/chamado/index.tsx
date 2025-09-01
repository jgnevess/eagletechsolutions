import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { useNavigate, useParams } from "react-router-dom";
import { ChamadoAberto, handleBuscarChamado, Status } from "../../service/chamado";
import Alert, { PropsAlert } from "../../components/alert";


const Chamado = () => {
    const param = useParams();

    const [chamado, setChamado] = useState<ChamadoAberto>()
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');

    useEffect(() => {
        handleBuscarChamado(Number.parseInt(param.id!)).then(response => {
            if (response.status !== 200) {
                setAlert(true)
                setAlertType('alert alert-danger')
                setMessage("Erro ao carregar o chamado, você será redirecionado")

                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                    navigate('/');
                }, 2500)
            } else if (response.status === 200) {
                const res = response.data as ChamadoAberto
                setChamado(res)
            }
        })
    })

    return (
        <Container>
            <>
                {alert ? <Alert message={message} type={alertType} /> : ''}

                <div className="card bg-dark text-light w-75">
                    <div className="d-flex justify-content-between card-header">
                        <h5>Abertura: {new Date(chamado?.abertura!).toLocaleString()}</h5>
                        <h5>Fechamento: {chamado?.fechamento !== '0001-01-01T00:00:00' ? new Date(chamado?.fechamento!).toLocaleString() : 'n/a'}</h5>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{chamado?.titulo}</h5>
                        <div className="d-flex flex-column text-start" style={{height: '50vh'}}>
                            <h4 className="card-text">Descrição: </h4>
                            <p className="card-text">{chamado?.descricao}</p>
                        </div>
                        <div className="d-flex justify-content-around card-header">
                            <h5>Status: {chamado?.status}</h5>
                            <h5>Prioridade: {chamado?.prioridade}</h5>
                            <h5>Categoria: {chamado?.categoria}</h5>
                        </div>
                        {
                            chamado?.status === Status.ABERTO && sessionStorage.getItem("role") === "TECNICO" ? 
                            <button className="btn btn-primary mt-2">Aceitar chamado</button> : ''
                        }
                        {
                            chamado?.status === Status.EM_ANDAMENTO && sessionStorage.getItem("role") === "TECNICO" ? 
                            <button className="btn btn-success mt-2">Finalizar chamado</button> : ''
                        }
                        {
                            chamado?.status === Status.FECHADO && sessionStorage.getItem("role") === "TECNICO" ? 
                            <button className="btn btn-primary disabled mt-2">Aceitar chamado</button> : ''
                        }
                        {
                            chamado?.status === Status.ABERTO && sessionStorage.getItem("role") === "SOLICITANTE" ? 
                            <button className="btn btn-danger mt-2">Cancelar chamado</button> : ''
                        }
                    </div>
                </div>
            </>
        </Container>
    )
}

export default Chamado