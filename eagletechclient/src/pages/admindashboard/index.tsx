import React, { useEffect, useState } from "react";
import Container from "../../components/container";

import profileImg from "../../images/Profile-PNG-Image-HD.png";
import { Link } from "react-router-dom";
import { handleGetAllUsuarios } from "../../service/user/userService";
import { ResponseList } from "../../service/user/user.models";



const AdminDashboard = () => {

  const [ativos, setAtivos] = useState(0);
  const [inativos, setInativos] = useState(0);
  const [usuarios, setUsuarios] = useState(0);
  const [tecnicos, setTecnicos] = useState(0);
  const [admins, setAdmins] = useState(0);
  const [solicitantes, setSolicitantes] = useState(0);

  useEffect(() => {
    handleGetAllUsuarios(1, 1).then(res => {
      if (res.status === 200) {
        const data = res.response as ResponseList
        setUsuarios(data.quantities.Total)
        setAtivos(data.quantities.Ativo)
        setInativos(data.quantities.Inativo)
        setAdmins(data.quantities.Admins)
        setTecnicos(data.quantities.Tecnicos)
        setSolicitantes(data.quantities.Solicitantes)
      }
    })
  }, [])

  return (
    <Container>
      <div className="w-75 d-flex align-items-center justify-content-around row" style={{ height: '80vh' }}>

        <h1>Resumo dos usuários</h1>

        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Cadastrados</h5>
              <h1 className="card-title">{usuarios}</h1>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Ativos</h5>
              <h1 className="card-title">{ativos}</h1>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Inativos</h5>
              <h1 className="card-title">{inativos}</h1>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Administradores</h5>
              <h1 className="card-title">{admins}</h1>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tecnicos</h5>
              <h1 className="card-title">{tecnicos}</h1>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Solicitantes</h5>
              <h1 className="card-title">{solicitantes}</h1>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default AdminDashboard;