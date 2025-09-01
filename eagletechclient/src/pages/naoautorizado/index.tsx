import React from "react";
import Container from "../../components/container";
import { Link } from "react-router-dom";
import { useFirstLogin } from "../../hooks/useFirstLogin";

const NaoAutorizado = () => {
    useFirstLogin();
    return(
        <Container>
            <>
                <h1>Você não tem autorização para acessar essa página</h1>
                <Link className="btn btn-dark" to={"/about"}>Voltar</Link>
            </>
        </Container>
    )
}

export default NaoAutorizado