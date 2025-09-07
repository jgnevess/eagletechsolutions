import React from "react";
import Container from "../../components/container";

import profileImg from "../../images/Profile-PNG-Image-HD.png";
import { Link } from "react-router-dom";



const AdminDashboard = () => {
  return (
    <Container>
      <div className="w-75 d-flex align-items-center justify-content-around" style={{ height: '80vh' }}>
        <Link to={"/usuarios"} className="card bg-dark text-light" style={{ width: "18rem" }}>
          <div className="d-flex justify-content-center">
            <img src={profileImg} className="card-img-top" alt="imagem usuario" style={{ width: '50%' }} />
          </div>
          <div className="card-body">
            <h2 className="card-text text-center">Gerenciar usuários</h2>
          </div>
        </Link>
        <Link to={'/cadastro'} className="card bg-dark text-light" style={{ width: "18rem" }}>
          <div className="d-flex justify-content-center">
            <img src={profileImg} className="card-img-top" alt="imagem usuario" style={{ width: '50%' }} />
          </div>
          <div className="card-body">
            <h2 className="card-text text-center">Cadastrar usuário</h2>
          </div>
        </Link>
      </div>
    </Container>
  )
}

export default AdminDashboard;