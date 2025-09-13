import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ChamadoAberto, ChamadoDatails, handleAceitarChamado, handleBuscarChamado, handleCancelarChamado, handleFinalizarChamado, Status } from "../../service/chamado";
import Alert, { PropsAlert } from "../../components/alert";
import { useFirstLogin } from "../../hooks/useFirstLogin";
import { Error } from "../../service/login/login.models";


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

                <div className="container py-4">
                    <div className="row g-4 mb-5">
                        <div className="mb-4 col-md-4">
                            <h6>⏰ Horários</h6>
                            <div className="p-3 border rounded bg-white small">
                                <div className="mb-2">
                                    <span className="fw-bold text-primary">📌 Abertura:</span>{" "}
                                    {new Date(chamado?.abertura!).toLocaleString()}
                                </div>
                                {chamado?.fechamento !== "0001-01-01T00:00:00" ?
                                    <div>
                                        <span className="fw-bold text-success">✅ Fechamento:</span>{" "}
                                        {new Date(chamado?.fechamento!).toLocaleString()}
                                    </div> : ''
                                }
                            </div>
                        </div>
                        <div className="mb-4 col-md-4">
                            <h6 className="mb-2">👤 Solicitante</h6>
                            <div className="p-3 border rounded bg-white small">
                                <p className="mb-1"><b>{chamado?.solicitante.nomeCompleto}</b></p>
                                <p className="mb-1">{chamado?.solicitante.email}</p>
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href={`https://wa.me/${chamado?.solicitante.telefone}`}
                                    className="text-success fw-semibold"
                                >
                                    <i className="bi bi-whatsapp me-2"></i>
                                    {chamado?.solicitante.telefone}
                                </a>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div>
                                <h6 className="mb-2">📊 Detalhes</h6>
                                <ul className="list-group small">
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Status</span> <span className="fw-bold">{chamado?.status}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Prioridade</span> <span className="fw-bold">{chamado?.prioridade}</span>
                                    </li>
                                    <li className="list-group-item d-flex justify-content-between">
                                        <span>Categoria</span> <span className="fw-bold">{chamado?.categoria}</span>
                                    </li>
                                    {chamado?.status !== Status.ABERTO && (
                                        <li className="list-group-item d-flex justify-content-between">
                                            <span>Técnico</span>{" "}
                                            <span className="fw-bold">{chamado?.tecnico?.nomeCompleto}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                    </div>

                    <div className="row g-4 mb-5">
                        <h4 className="mb-3">📝 Descrição</h4>
                        <div className="p-4 bg-light rounded border" style={{ minHeight: "40vh" }}>
                            <h5 className="fw-bold mb-3">{chamado?.titulo}</h5>
                            <p className="text-muted fs-6">{chamado?.descricao}</p>
                        </div>
                    </div>

                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        {chamado?.status === Status.ABERTO &&
                            sessionStorage.getItem("role") === "TECNICO" && (
                                <button onClick={handleAceitar} className="btn btn-primary btn-lg">
                                    Aceitar chamado
                                </button>
                            )}

                        {chamado?.status === Status.EM_ANDAMENTO &&
                            sessionStorage.getItem("role") === "TECNICO" && (
                                <button onClick={handleFechar} className="btn btn-success btn-lg">
                                    Finalizar chamado
                                </button>
                            )}

                        {chamado?.status === Status.FECHADO &&
                            sessionStorage.getItem("role") === "TECNICO" && (
                                <button className="btn btn-secondary btn-lg disabled">
                                    Aceitar chamado
                                </button>
                            )}

                        {chamado?.status === Status.ABERTO &&
                            sessionStorage.getItem("role") === "SOLICITANTE" && (
                                <>
                                    <button
                                        data-bs-toggle="modal"
                                        data-bs-target="#deleteModal"
                                        className="btn btn-danger btn-lg"
                                    >
                                        Cancelar chamado
                                    </button>
                                    <Link
                                        to={`/chamados/editar-chamado/${chamado.numeroChamado}`}
                                        className="btn btn-outline-primary btn-lg"
                                    >
                                        Editar chamado
                                    </Link>
                                </>
                            )}
                    </div>
                </div>


                <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
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