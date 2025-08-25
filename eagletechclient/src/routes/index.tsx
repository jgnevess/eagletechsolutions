import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import AboutUser from "../pages/Home";
import NotFound from "../pages/notfound";
import LoginPage from "../pages/login";
import PrivateRouter from "./privateRoute";
import NovaSenha from "../pages/nova-senha";
import AdminDashboard from "../pages/admindashboard";
import TecnicoDashboard from "../pages/tecnicodashboard";
import SolicitanteDashboard from "../pages/solicitantedashboard";

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
                        <AdminDashboard />
                    </PrivateRouter>
                } />

                <Route path="/sol" element={
                    <PrivateRouter roles={["SOLICITANTE"]}>
                        <SolicitanteDashboard />
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