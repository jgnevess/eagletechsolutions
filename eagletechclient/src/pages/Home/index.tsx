import React from "react";
import { Link } from "react-router-dom";
import Container from "../../components/container";
import { UserOut } from "../../service/login/login.models";
import { useFirstLogin } from "../../hooks/useFirstLogin";

const AboutUser = () => {
    useFirstLogin();
    const u = JSON.parse(sessionStorage.getItem("usuario")!) as UserOut;

    const link = u.funcao === "ADMIN" ? '/admin' : u.funcao === "SOLICITANTE" ? '/sol' : '/tec'

    return (
        <Container>
            <div className="container py-4">
                <div className="row g-4 mb-5">

                    <div className="col-md-8 text-start">
                        <div className="mb-5 border-start border-3 border-primary ps-3">
                            <div className="mb-2">
                                <span className="fw-bold text-primary">👤 Nome:</span> {u.nomeCompleto}
                            </div>
                            <div className="mb-2">
                                <span className="fw-bold text-success">📧 Email:</span> {u.email}
                            </div>
                            <div className="mb-2">
                                <span className="fw-bold text-warning">📞 Telefone:</span> {u.telefone}
                            </div>
                            <div>
                                <span className="fw-bold text-info">🆔 Matrícula:</span> {u.matricula}
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <h6 className="mb-2">⚙️ Ações</h6>
                        <div className="p-3 border rounded bg-white d-flex flex-column gap-3">
                            <Link to={"/alterar-senha"} className="btn btn-dark w-100">Alterar senha</Link>
                            <Link to={link} className="btn btn-outline-primary w-100">Voltar ao Início</Link>
                        </div>
                    </div>
                </div>

                <h4 className="mb-3">📝 Detalhes do Usuário</h4>
                <div className="p-4 bg-light rounded border text-start" style={{ minHeight: "40vh" }}>
                    <ul className="list-unstyled fs-5">
                        <li><b>Nome completo:</b> {u.nomeCompleto}</li>
                        <li><b>Email:</b> {u.email}</li>
                        <li><b>Telefone:</b> {u.telefone}</li>
                        <li><b>Matrícula:</b> {u.matricula}</li>
                        <li><b>Função:</b> {u.funcao}</li>
                    </ul>
                </div>
            </div>
        </Container>
    );
};

export default AboutUser;
