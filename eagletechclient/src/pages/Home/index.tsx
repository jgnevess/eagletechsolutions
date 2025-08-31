import React, { useEffect, useState } from "react";
import { handleAbrirChamado } from "../../service/chamado";
import { useNavigate } from "react-router-dom";
import { Usuario } from "../../service/login";
import Container from "../../components/container";
import { handleFirstLogin } from "../../service/firstlogin";
import { useFirstLogin } from "../../hooks/useFirstLogin";



const AboutUser = () => {

    const navigate = useNavigate();

    const u = JSON.parse(sessionStorage.getItem("usuario")!) as Usuario;

    useFirstLogin();

    return (
        <Container>
            <div className="form-content p-5 rounded w-75">
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

                <button className="btn btn-dark" onClick={() => {
                    sessionStorage.clear();
                    window.location.href = '/login'
                }}>Sair</button>
            </div>
        </Container>
    )
}

export default AboutUser;