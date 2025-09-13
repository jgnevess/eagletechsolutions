import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png"

interface Props {
    role: string
}

const Navbar = (props: Props) => {

    const AdminLinks = [
        { nome: 'Dashboard', url: '/admin', iconClass: 'bi bi-pc-display' },
        { nome: 'Cadastrar usuário', url: '/cadastro', iconClass: 'bi bi-person-plus-fill' },
        { nome: 'Gerenciar usuários', url: '/usuarios', iconClass: 'bi bi-people-fill' },
        { nome: 'Meus dados', url: '/about', iconClass: 'bi bi-person-vcard-fill' },
        { nome: 'Sair', url: '/logout', iconClass: 'bi bi-door-closed-fill' }
    ]

    const SolicitanteLinks = [
        { nome: 'Meus chamados', url: '/chamados', iconClass: 'bi bi-window-stack' },
        { nome: 'Abrir Chamado', url: '/novo-chamado', iconClass: 'bi bi-wrench' },
        { nome: 'Meus dados', url: '/about', iconClass: 'bi bi-person-vcard-fill' },
        { nome: 'Sair', url: '/logout', iconClass: 'bi bi-door-closed-fill' }
    ]

    const TecnicoLinks = [
        { nome: 'Chamados Abertos', url: '/chamados-abertos', iconClass: 'bi bi-window-stack' },
        { nome: 'Chamados Atendidos', url: '/chamados-atendidos', iconClass: 'bi bi-window-stack' },
        { nome: 'Meus dados', url: '/about', iconClass: 'bi bi-person-vcard-fill' },
        { nome: 'Sair', url: '/logout', iconClass: 'bi bi-door-closed-fill' }
    ]

    const Links = props.role === "ADMIN" ? AdminLinks.map((i, k) => {
        return (
            <Link to={i.url} className="list-group-item w-100 d-flex justify-content-between py-3" key={k} style={{ backgroundColor: "#1e233c" }}>
                <div className="d-flex">
                    <span className="nav-link text-light fw-bold me-2"><i className={i.iconClass}></i></span>
                    <span className="nav-link text-light fw-bold">{i.nome}</span>
                </div>
                <span className="nav-link text-light fw-bold"><i className="bi bi-caret-right-fill"></i></span>
            </Link>
        )
    }) : props.role === "SOLICITANTE" ? SolicitanteLinks.map((i, k) => {
        return (
            <Link to={i.url} className="list-group-item w-100 d-flex justify-content-between" key={k} style={{ backgroundColor: "#1e233c" }}>
                <div className="d-flex">
                    <span className="nav-link text-light fw-bold me-2"><i className={i.iconClass}></i></span>
                    <span className="nav-link text-light fw-bold">{i.nome}</span>
                </div>
                <span className="nav-link text-light fw-bold"><i className="bi bi-caret-right-fill"></i></span>
            </Link>
        )
    }) : props.role === "TECNICO" ? TecnicoLinks.map((i, k) => {
        return (
            <Link to={i.url} className="list-group-item w-100 d-flex justify-content-between" key={k} style={{ backgroundColor: "#1e233c" }}>
                <div className="d-flex">
                    <span className="nav-link text-light fw-bold me-2"><i className={i.iconClass}></i></span>
                    <span className="nav-link text-light fw-bold">{i.nome}</span>
                </div>
                <span className="nav-link text-light fw-bold"><i className="bi bi-caret-right-fill"></i></span>
            </Link>
        )
    }) : '';

    return (
        <nav style={{ height: "100vh", backgroundColor: "#1e233c" }} className="w-100">
            <div className="d-flex flex-column">
                <Link className="navbar-brand text-light" to={
                    props.role === "ADMIN" ? '/admin' : props.role === "SOLICITANTE" ? '/sol' : '/tec'
                }><img src={logo} className="rounded mt-2" width={100} />
                    <h4>EAGLETECH</h4>
                    <p>SOLUTIONS</p>
                </Link>
                <div className="w-100">
                    <ul className="list-group list-group-flush mt-5">
                        {Links}
                    </ul>
                </div>
            </div>
        </nav >
    )
}

export default Navbar;