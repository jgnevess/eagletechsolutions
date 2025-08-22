import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import NovoChamado from "../pages/Home";
import NotFound from "../pages/notfound";
import LoginPage from "../pages/login";
import PrivateRouter from "./privateRoute";
import NovaSenha from "../pages/nova-senha";
import AdminDashboard from "../pages/admindashboard";

const Routers = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />}/>
                <Route path="/chat/:numeroChamado" element={<ChatPage />}/>
                <Route path="/login" element={<LoginPage />}/>

                <Route path="/" element={
                    <PrivateRouter roles={["SOLICITANTE", "ADMIN", "TECNICO"]}>
                        <NovoChamado />
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


            </Routes>
        </BrowserRouter>
    )
}


export default Routers;