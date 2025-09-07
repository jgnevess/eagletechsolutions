import React from "react";
import { Link } from "react-router-dom";

interface Props {
    role: string
}

const Navbar = (props: Props) => {

    const AdminLinks = [
        { nome: 'Usuarios', url: '/usuarios' },
        { nome: 'Cadastro', url: '/cadastro' },
        { nome: 'Sair', url: '/login' }
    ]

    const SolicitanteLinks = [
        { nome: 'Chamados', url: '/chamados' },
        { nome: 'Abrir Chamado', url: '/novo-chamado' },
        { nome: 'Sair', url: '/login' }
    ]

    const TecnicoLinks = [
        { nome: 'Chamados Abertos', url: '/chamados-abertos' },
        { nome: 'Chamados Atendidos', url: '/chamados-atendidos' },
        { nome: 'Sair', url: '/login' }
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

    return (
        <nav className="navbar navbar-expand-lg text-light bg" style={{ height: "10vh" }}>
            <div className="container-fluid">
                <Link className="navbar-brand text-light" to={
                    props.role === "ADMIN" ? '/admin' : props.role === "SOLICITANTE" ? '/sol' : 'tec'
                }><img src="https://images.pexels.com/photos/133356/pexels-photo-133356.jpeg?_gl=1*1wipcs5*_ga*NzE3NjIyNjk5LjE3NTY1NzM3MTk.*_ga_8JE65Q40S6*czE3NTY1NzM3MTkkbzEkZzEkdDE3NTY1NzM3NDMkajM2JGwwJGgw" className="rounded" width={100} /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {Links}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;