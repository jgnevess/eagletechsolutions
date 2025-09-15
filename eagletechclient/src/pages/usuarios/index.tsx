import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { handleGetAllUsuarios, handleGetAllUsuariosByNome } from "../../service/user/userService";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/inputForm";
import { UserOut } from "../../service/login/login.models";
import { ResponseList } from "../../service/user/user.models";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<UserOut[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [nome, setNome] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasMore) return;

    handleGetAllUsuarios(page, 15).then(res => {
      const data = res.response as ResponseList;
      const list = data.data as UserOut[]
      if (list.length === 0) {
        setHasMore(false);
        return;
      }
      setUsuarios(prev => [...prev, ...list]);
    })
  }, [page, hasMore]);

  const handleByNome = (e: string) => {
    setHasMore(true);
    setPage(1)
    setUsuarios([])
    setNome(e)
    if (e === "") {
      handleGetAllUsuarios(page, 15).then(res => {
        const data = res.response as ResponseList;
        const list = data.data as UserOut[]
        if (list.length === 0) {
          setHasMore(false);
          return;
        }
        setUsuarios(prev => [...prev, ...list]);

      })
    }
    else {
      handleGetAllUsuariosByNome(e).then(response => {
        const data = response.response as ResponseList
        const list = data.data as UserOut[]
        setUsuarios(list)
      })
    }
  }

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 5) {
      setPage(prev => prev + 1);
    }
  };

  const USUARIOS = usuarios.map((u, k) => (
    <tr key={k} onClick={() => navigate(`/usuario/${u.matricula}`)} style={{ cursor: 'pointer' }}>
      <td>{u.matricula}</td>
      <td className={u.ativo ? 'text-dark' : 'text-danger'}>{u.nomeCompleto}</td>
      <td className={u.ativo ? 'text-dark' : 'text-danger'}>{u.email}</td>
      <td>{u.telefone}</td>
      <td className={u.ativo ? 'text-dark' : 'text-danger'}>{u.ativo ? u.funcao : 'INATIVO'}</td>
    </tr>
  ));

  return (
    <Container>
      <>
        <div className="d-flex flex-column justify-content-start w-100 mt-2" style={{ height: '100vh', width: '75vw', overflow: 'auto' }} onScroll={handleScroll}>
          {/* <InputForm inputStyle="input" id="nome" placeholder="Buscar por nome" set={(e) => handleByNome(e.target.value)} type="text" value={nome} /> */}
          <table className="table table-striped w-100">
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Username</th>
                <th>Telefone</th>
                <th>Perfil</th>
              </tr>
            </thead>
            <tbody>
              {USUARIOS}
            </tbody>
          </table>
          {!hasMore && <p className="text-center mt-2">Fim da lista</p>}
        </div>
      </>
    </Container>
  );
}

export default Usuarios;
