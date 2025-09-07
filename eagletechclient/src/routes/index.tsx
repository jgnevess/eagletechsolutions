import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import AboutUser from "../pages/Home";
import NotFound from "../pages/notfound";
import LoginPage from "../pages/login";
import PrivateRouter from "./privateRoute";
import NovaSenha from "../pages/nova-senha";
import TecnicoDashboard from "../pages/tecnicodashboard";
import SolicitanteDashboard from "../pages/solicitantedashboard";
import NovoChamado from "../pages/novo-chamado";
import Chamados from "../pages/chamados";
import Chamado from "../pages/chamado";
import ChamadosAbertos from "../pages/chamadosAbertos";
import ChamadosAtendidos from "../pages/chamadosAtendidos";
import EditarChamado from "../pages/editar-chamado";
import Usuarios from "../pages/usuarios";
import UsuarioPage from "../pages/usuario";
import AdminDashboard from "../pages/admindashboard";
import CadastrarUsuarioPage from "../pages/cadastrar-usuario";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/chat/:numeroChamado" element={<ChatPage />} />
                <Route path="/login" element={<LoginPage />} />

                <Route path="/about" element={
                    <PrivateRouter roles={["SOLICITANTE", "ADMIN", "TECNICO"]}>
                        <AboutUser />
                    </PrivateRouter>
                } />
                <Route path="/nova-senha" element={
                    <PrivateRouter roles={["SOLICITANTE", "ADMIN", "TECNICO"]}>
                        <NovaSenha />
                    </PrivateRouter>
                } />
                <Route path="/admin" element={
                    <PrivateRouter roles={["ADMIN"]}>
                        <AdminDashboard />
                    </PrivateRouter>
                } />

                <Route path="/cadastro" element={
                    <PrivateRouter roles={["ADMIN"]}>
                        <CadastrarUsuarioPage />
                    </PrivateRouter>
                } />

                <Route path="/usuarios" element={
                    <PrivateRouter roles={["ADMIN"]}>
                        <Usuarios />
                    </PrivateRouter>
                } />

                <Route path="/usuario/:matricula" element={
                    <PrivateRouter roles={["ADMIN"]}>
                        <UsuarioPage />
                    </PrivateRouter>
                } />

                <Route path="/sol" element={
                    <PrivateRouter roles={["SOLICITANTE"]}>
                        <SolicitanteDashboard />
                    </PrivateRouter>
                } />

                <Route path="/novo-chamado" element={
                    <PrivateRouter roles={["SOLICITANTE"]}>
                        <NovoChamado />
                    </PrivateRouter>
                } />

                <Route path="/chamados" element={
                    <PrivateRouter roles={["SOLICITANTE"]}>
                        <Chamados />
                    </PrivateRouter>
                } />

                <Route path="chamados/editar-chamado/:id" element={
                    <PrivateRouter roles={["SOLICITANTE"]}>
                        <EditarChamado />
                    </PrivateRouter>
                } />

                <Route path="/chamados-abertos" element={
                    <PrivateRouter roles={["TECNICO"]}>
                        <ChamadosAbertos />
                    </PrivateRouter>
                } />

                <Route path="/chamados-atendidos" element={
                    <PrivateRouter roles={["TECNICO"]}>
                        <ChamadosAtendidos />
                    </PrivateRouter>
                } />

                <Route path="/chamados/chamado/:id" element={
                    <PrivateRouter roles={["SOLICITANTE"]}>
                        <Chamado />
                    </PrivateRouter>
                } />

                <Route path="/chamados-abertos/chamado/:id" element={
                    <PrivateRouter roles={["TECNICO"]}>
                        <Chamado />
                    </PrivateRouter>
                } />

                <Route path="/chamados-atendidos/chamado/:id" element={
                    <PrivateRouter roles={["TECNICO"]}>
                        <Chamado />
                    </PrivateRouter>
                } />

                <Route path="/tec" element={
                    <PrivateRouter roles={["TECNICO"]}>
                        <TecnicoDashboard />
                    </PrivateRouter>
                } />

                <Route path="/" element={
                    <PrivateRouter roles={["SOLICITANTE", "ADMIN", "TECNICO"]}>
                        <AboutUser />
                    </PrivateRouter>
                } />

            </Routes>
        </BrowserRouter>
    )
}


export default Routers;