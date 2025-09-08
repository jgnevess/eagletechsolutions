import React, { useEffect, useState } from "react";
import { handleAbrirChamado } from "../../service/chamado";
import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/container";
import { handleFirstLogin } from "../../service/firstlogin";
import { useFirstLogin } from "../../hooks/useFirstLogin";
import { UserOut } from "../../service/login/login.models";



const AboutUser = () => {

    const navigate = useNavigate();

    const u = JSON.parse(sessionStorage.getItem("usuario")!) as UserOut;

    useFirstLogin();

    return (
        <Container>
            <div className="form-content p-5 rounded w-75 text-center">
                <h1>Página protegida</h1>
                <h4>Se você entrou nessa página tem um login com as credenciais válidas</h4>

                <h3>Dados:</h3>
                <ul className="text-start display-6">
                    <li>Matricula: {u.matricula}</li>
                    <li>Nome: {u.nomeCompleto}</li>
                    <li>Email: {u.email}</li>
                    <li>Telefone: {u.telefone}</li>
                    <li>Função: {u.funcao}</li>
                </ul>

                <div className="d-flex justify-content-around">
                    <button className="btn btn-dark" onClick={() => {
                        window.location.href = '/logout'
                    }}>Sair</button>

                    <Link to={"/alterar-senha"} className="btn btn-dark">Alterar senha</Link>
                </div>
            </div>
        </Container>
    )
}

export default AboutUser;