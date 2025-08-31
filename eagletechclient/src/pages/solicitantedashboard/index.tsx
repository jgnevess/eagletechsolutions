import React from "react";
import Container from "../../components/container";
import { useFirstLogin } from "../../hooks/useFirstLogin";


const SolicitanteDashboard = () => {
    useFirstLogin();
    return(
        <Container>
            <>
                Solicitante
            </>
        </Container>
    )
}

export default SolicitanteDashboard