import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { handleGetAllUsuarios, handleGetAllUsuariosByNome, Usuario } from "../../service/usuario";
import { useNavigate } from "react-router-dom";
import InputForm from "../../components/inputForm";

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [nome, setNome] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasMore) return;

    handleGetAllUsuarios(page, 10).then(res => {
      const data = res.resposta as Usuario[];
      if (data.length === 0) {
        setHasMore(false);
        return;
      }
      setUsuarios(prev => [...prev, ...data]);
    })
  }, [page, hasMore]);

  const handleByNome = (e: string) => {
    setHasMore(true);
    setPage(1)
    setUsuarios([])
    setNome(e)
    if (e === "") {
      handleGetAllUsuarios(page, 10).then(res => {
        const data = res.resposta as Usuario[];
        if (data.length === 0) {
          setHasMore(false);
          return;
        }
        setUsuarios(prev => [...prev, ...data]);

      })
    }
    else {
      handleGetAllUsuariosByNome(e).then(response => {
        const data = response.resposta as Usuario[]
        setUsuarios(data)
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
      <td>{u.nomeCompleto}</td>
      <td>{u.email}</td>
      <td>{u.telefone}</td>
      <td>{u.funcao}</td>
    </tr>
  ));

  return (
    <Container>
      <>
        <div style={{ height: '70vh', width: '75vw', overflow: 'auto' }} onScroll={handleScroll}>
          <InputForm inputStyle="input" id="nome" placeholder="Buscar por nome" set={(e) => handleByNome(e.target.value)} type="text" value={nome} />
          <table className="table table-dark table-striped w-100">
            <thead>
              <tr>
                <th>Matricula</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Role</th>
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
