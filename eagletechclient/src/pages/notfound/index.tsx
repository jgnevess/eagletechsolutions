import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
    return(
        <div className="bg-dark text-light w-100 d-flex flex-column justify-content-center align-items-center" style={{height: '100vh'}}>
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <Link to="/" className="btn btn-light">Voltar ao inicio</Link>
        </div>
    )
}


export default NotFound