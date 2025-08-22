import React from "react"
import { Link } from "react-router-dom"
import Container from "../../components/container"

const NotFound = () => {
    return (
        <Container>
            <>
                <h1>404</h1>
                <h2>Página não encontrada</h2>
                <Link to="/" className="btn btn-dark">Voltar ao inicio</Link>
            </>
        </Container >
    )
}


export default NotFound