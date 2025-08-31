import React from "react";
import Container from "../../components/container";
import CadastrarUsuario from "../../components/cadastrarUsuario";
import { useFirstLogin } from "../../hooks/useFirstLogin";


const AdminDashboard = () => {
    useFirstLogin();
    return(
        <Container>
            <>
                <div className="row w-75">
                    <div className="col-2" />
                    <div className="col-4">
                        
                    </div>
                    <div className="col-6">
                        <CadastrarUsuario />
                    </div>
                </div>
            </>
        </Container>
    )
}

export default AdminDashboard;