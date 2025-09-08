import React from "react";
import Container from "../../components/container";
import { useFirstLogin } from "../../hooks/useFirstLogin";
import { Link } from "react-router-dom";

import img from "../../images/35932-1-desktop-computer.png";


const SolicitanteDashboard = () => {
    useFirstLogin();
    return (
        <Container>
            <div className="w-75 d-flex align-items-center justify-content-around" style={{ height: '80vh' }}>
                <Link to={"/novo-chamado"} className="card bg-dark text-light" style={{ width: "18rem" }}>
                    <div className="d-flex justify-content-center">
                        <img src={img} className="card-img-top" alt="imagem usuario" style={{ width: '50%' }} />
                    </div>
                    <div className="card-body">
                        <h2 className="card-text text-center">Novo chamado</h2>
                    </div>
                </Link>
                <Link to={'/chamados'} className="card bg-dark text-light" style={{ width: "18rem" }}>
                    <div className="d-flex justify-content-center">
                        <img src={img} className="card-img-top" alt="imagem usuario" style={{ width: '50%' }} />
                    </div>
                    <div className="card-body">
                        <h2 className="card-text text-center">Acompanhar chamados</h2>
                    </div>
                </Link>
            </div>
        </Container>
    )
}

export default SolicitanteDashboard