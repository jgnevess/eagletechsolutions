import React from "react";
import Container from "../../components/container";
import { useParams } from "react-router-dom";


const Chamado = () => {
    const param = useParams();
    return(
        <Container>
            <>
                {param.id}
            </>
        </Container>
    )
}

export default Chamado