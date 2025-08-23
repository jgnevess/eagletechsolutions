import React from "react";
import { Link } from "react-router-dom";

interface Props {
    role: string
}

const Navbar = (props: Props) => {

    const AdminLinks = [
        { nome: 'Usuarios', url: '/usuarios' },
        { nome: 'Cadastro', url: '/cadastro' }
    ]

    const SolicitanteLinks = [
        { nome: 'Chamados', url: '/chamados' },
        { nome: 'Abrir Chamado', url: '/novo-chamado' }
    ]

    const TecnicoLinks = [
        { nome: 'Chamados', url: '/chamados' },
    ]

    const Links = props.role === "ADMIN" ? AdminLinks.map((i, k) => {
        return (
            <li className="nav-item" key={k}>
                <Link className="nav-link text-light" to={i.url}>{i.nome}</Link>
            </li>
        )
    }) : props.role === "SOLICITANTE" ? SolicitanteLinks.map((i, k) => {
        return (
            <li className="nav-item" key={k}>
                <Link className="nav-link text-light" to={i.url}>{i.nome}</Link>
            </li>
        )
    }) : props.role === "TECNICO" ? TecnicoLinks.map((i, k) => {
        return (
            <li className="nav-item" key={k}>
                <Link className="nav-link text-light" to={i.url}>{i.nome}</Link>
            </li>
        )
    }) : '';

    const handleSair = () => {
        sessionStorage.clear()
        window.location.href = '/login'
    }

    return (
        <nav className="navbar navbar-expand-lg text-light bg" style={{ height: "10vh" }}>
            <div className="container-fluid">
                <a className="navbar-brand text-light" href={
                    props.role === "ADMIN" ? '/admin' : props.role === "SOLICITANTE" ? '/sol' : 'tec'
                }>LOGO EAGLETECH</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {Links}
                        <li className="nav-item">
                            <button onClick={handleSair} className="nav-link text-light">Sair</button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;