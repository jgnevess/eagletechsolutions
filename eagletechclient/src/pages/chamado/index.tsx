import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChamadoAberto, ChamadoDatails, handleAceitarChamado, handleBuscarChamado, handleCancelarChamado, handleFinalizarChamado, Status } from "../../service/chamado";
import Alert, { PropsAlert } from "../../components/alert";
import { Error } from "../../service/login";
import { useFirstLogin } from "../../hooks/useFirstLogin";


const Chamado = () => {
    const param = useParams();
    useFirstLogin();

    const [chamado, setChamado] = useState<ChamadoDatails>()
    const navigate = useNavigate();

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');
    const [reload, setReload] = useState(false);

    useEffect(() => {
        handleBuscarChamado(Number.parseInt(param.id!)).then(response => {
            if (response.status !== 200) {
                setAlert(true)
                setAlertType('alert alert-danger')
                setMessage("Erro ao carregar o chamado")

                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                }, 2500)
            } else if (response.status === 200) {
                const res = response.data as ChamadoDatails
                setChamado(res)
            }
        })
    }, [reload])

    const handleAceitar = () => {
        const numeroChamado = Number.parseInt(param.id!);
        const tecnicoMatricula = Number.parseInt(sessionStorage.getItem("matricula")!);
        handleAceitarChamado(numeroChamado, tecnicoMatricula).then(response => {
            if (response.status !== 200) {
                const data = response.data as Error;
                setAlert(true)
                setAlertType('alert alert-danger')
                setMessage(data.Error)
                setReload(true)
                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setReload(false)
                    setAlertType('alert alert-primary')
                    navigate('/');
                }, 2500)
            } else {
                setReload(true)
                setAlert(true)
                setAlertType('alert alert-success')
                setMessage("Chamado aceito")
                setChamado(chamado)
                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setReload(false)
                    setAlertType('alert alert-primary')
                }, 2500)
            }
        })
    }

    const handleFechar = () => {
        const numeroChamado = Number.parseInt(param.id!);
        const tecnicoMatricula = Number.parseInt(sessionStorage.getItem("matricula")!);
        handleFinalizarChamado(numeroChamado, tecnicoMatricula).then(response => {
            if (response.status !== 200) {
                const data = response.data as Error;
                setAlert(true)
                setAlertType('alert alert-danger')
                setMessage(data.Error)
                setReload(true)
                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setReload(false)
                    setAlertType('alert alert-primary')
                    navigate('/');
                }, 2500)
            } else {
                setReload(true)
                setAlert(true)
                setAlertType('alert alert-success')
                setMessage("Chamado Finalizado")
                setChamado(chamado)
                setTimeout(() => {
                    setMessage('')
                    setReload(false)
                    setAlert(false)
                    setAlertType('alert alert-primary')
                }, 2500)
            }
        })
    }

    const handleCancelar = () => {
        const numeroChamado = Number.parseInt(param.id!);
        handleCancelarChamado(numeroChamado).then(response => {
            if (response.status !== 204) {
                const data = response.data as Error;
                setAlert(true)
                setAlertType('alert alert-danger')
                setMessage(data.Error)

                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                    navigate('/');
                }, 2500)
            } else {
                setAlert(true)
                setAlertType('alert alert-success')
                setMessage("Chamado Cancelado")
                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                    navigate('/chamados');
                }, 2500)
            }
        })
    }

    return (
        <Container>
            <>
                {alert ? <Alert message={message} type={alertType} /> : ''}

                <div className="card bg-dark text-light w-75">
                    <div className="d-flex justify-content-between card-header">
                        <h5>Abertura: {new Date(chamado?.abertura!).toLocaleString()}</h5>
                        <h5>Fechamento: {chamado?.fechamento !== '0001-01-01T00:00:00' ? new Date(chamado?.fechamento!).toLocaleString() : 'n/a'}</h5>
                    </div>
                    <div className="d-flex justify-content-between card-header">
                        <h5>Solicitante: {chamado?.solicitante.nomeCompleto}</h5>
                        <h5>Email: {chamado?.solicitante.email}</h5>
                        <a target="_blank" href={`https://wa.me/${chamado?.solicitante.telefone}`}><i className="bi bi-whatsapp"></i> Telefone: {chamado?.solicitante.telefone}</a>
                    </div>
                    <div className="card-body">
                        <h1 className="card-title">Titulo: {chamado?.titulo}</h1>
                        <div className="d-flex flex-column text-start" style={{ height: '50vh' }}>
                            <h4 className="card-text">Descrição: </h4>
                            <p className="card-text">{chamado?.descricao}</p>
                        </div>

                        <div className="d-flex justify-content-around card-header">
                            <h5>Status: {chamado?.status}</h5>
                            <h5>Prioridade: {chamado?.prioridade}</h5>
                            <h5>Categoria: {chamado?.categoria}</h5>
                            {chamado?.status === Status.ABERTO ? ' ' : <h5>Técnico responsavel: {chamado?.tecnico?.nomeCompleto}</h5>}

                        </div>

                        <div className="d-flex justify-content-around">
                            {
                                chamado?.status === Status.ABERTO && sessionStorage.getItem("role") === "TECNICO" ?
                                    <button onClick={handleAceitar} className="btn btn-primary mt-2">Aceitar chamado</button> : ''
                            }
                            {
                                chamado?.status === Status.EM_ANDAMENTO && sessionStorage.getItem("role") === "TECNICO" ?
                                    <button onClick={handleFechar} className="btn btn-success mt-2">Finalizar chamado</button> : ''
                            }
                            {
                                chamado?.status === Status.FECHADO && sessionStorage.getItem("role") === "TECNICO" ?
                                    <button className="btn btn-primary disabled mt-2">Aceitar chamado</button> : ''
                            }
                            {
                                chamado?.status === Status.ABERTO && sessionStorage.getItem("role") === "SOLICITANTE" ?
                                    <button data-bs-toggle="modal" data-bs-target="#deleteModal" className="btn btn-danger mt-2">Cancelar chamado</button> : ''
                            }
                            {
                                chamado?.status === Status.ABERTO && sessionStorage.getItem("role") === "SOLICITANTE" ?
                                    <Link to={`/chamados/editar-chamado/${chamado.numeroChamado}`} className="btn btn-primary mt-2">Editar chamado</Link> : ''
                            }
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content bg-dark text-light">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="deleteModalLabel">Cancelar chamado</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <p>Se você cancelar seu chamado e seu problema não tiver sido resolvido, será necessário abrir um novo chamado!</p>
                                <p>Deseja mesmo cancelar?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Não</button>
                                <button onClick={handleCancelar} type="button" className="btn btn-danger" data-bs-dismiss="modal">Sim</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        </Container >
    )
}

export default Chamado