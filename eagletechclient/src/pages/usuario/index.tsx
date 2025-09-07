import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetUsuario, Usuario } from "../../service/usuario";
import CadastrarUsuario from "../../components/cadastrarUsuario";
import Alert, { PropsAlert } from "../../components/alert";
import InputForm from "../../components/inputForm";

const UsuarioPage = () => {
  const [usuario, setUsuario] = useState<Usuario>();

  const [nomeCompleto, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTelefone] = useState('')
  const [funcao, setFuncao] = useState('SOLICITANTE')

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');

  const param = useParams()

  useEffect(() => {
    if (param.matricula) {
      handleGetUsuario(param.matricula).then(res => {
        if (res.status == 200) {
          const data = res.resposta as Usuario
          setNome(data.nomeCompleto)
          setEmail(data.email)
          setFuncao(data.funcao)
          setTelefone(data.telefone)
        }
      })
    }
    else {
      setMessage("Erro ao carregar usuário")
      setAlert(true)
      setAlertType('alert alert-danger')
      setTimeout(() => {
        setMessage('')
        setAlert(false)
        setAlertType('alert alert-primary')
      }, 5000)

    }
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var telefone = tel.replace("-", "").replace("(", "").replace(")", "").replace(" ", "")

    // handleRegister(user).then(res => {
    //   if (res.status === 200) {
    //     const data = res.CadastroResposta as Usuario
    //     setMessage(`Usuário ${data.nomeCompleto} cadastrado com sucesso! Login com a matricula: ${data.matricula}`)
    //     setAlert(true)
    //     setAlertType('alert alert-success')
    //     setTimeout(() => {
    //       setMessage('')
    //       setAlert(false)
    //       setAlertType('alert alert-primary')
    //     }, 2500)

    //   } else if (res.status !== 200) {
    //     const data = res.CadastroResposta as Error
    //     setMessage(data.Error)
    //     setAlert(true)
    //     setAlertType('alert alert-danger')
    //     setTimeout(() => {
    //       setMessage('')
    //       setAlert(false)
    //       setAlertType('alert alert-primary')
    //     }, 5000)
    //   }
    // });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    setTelefone(value);
  };

  return (
    <Container>
      <div className="w-50">
        {alert ? <Alert type={alertType} message={message} /> : ''}
        <form onSubmit={handleSubmit} className="w-100 form-content p-5 rounded">
          <InputForm inputStyle="input" id="nome" placeholder="Nome Completo" set={(e) => setNome(e.target.value)} type="text" value={nomeCompleto} />
          <InputForm inputStyle="input" id="email" placeholder="Email" set={(e) => setEmail(e.target.value)} type="email" value={email} />
          <InputForm inputStyle="input" id="telefone" placeholder="Telefone" set={handleChange} type="text" value={tel} />
          <div className="form-floating">
            <select value={funcao} onChange={(e) => setFuncao(e.target.value)} className="form-select" id="funcao">
              <option selected disabled>Selecione a função</option>
              <option value="ADMIN">Administrador</option>
              <option value="TECNICO">Técnico</option>
              <option value="SOLICITANTE">Solicitante</option>
            </select>
            <label htmlFor="funcao">Selecione a função</label>
          </div>
          <div className="d-grid mt-3">
            <button className="btn btn-dark">Editar</button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default UsuarioPage;
