import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatPage from "../pages/ChatPage";
import NovoChamado from "../pages/Home";
import NotFound from "../pages/notfound";

const Routers = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<NotFound />}/>
                <Route path="/chat/:numeroChamado" element={<ChatPage />}/>
                <Route path="/" element={<NovoChamado />}/>
            </Routes>
        </BrowserRouter>
    )
}


export default Routers;