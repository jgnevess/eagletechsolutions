import React, { useEffect, useState } from "react";
import Container from "../../components/container";
import { useNavigate, useParams } from "react-router-dom";
import { handleActiveUser, handleDeleteUserDb, handleEditarUsuario, handleGetUsuario, handleResetarSenhaUser } from "../../service/user/userService";
import CadastrarUsuario from "../../components/cadastrarUsuario";
import Alert, { PropsAlert } from "../../components/alert";
import InputForm from "../../components/inputForm";
import { UserOut } from "../../service/login/login.models";
import { Error } from "../../service/user/user.models";

const UsuarioPage = () => {
  const [usuario, setUsuario] = useState<UserOut>();

  const [nomeCompleto, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [tel, setTelefone] = useState('')
  const [funcao, setFuncao] = useState('SOLICITANTE')
  const [ativo, setAtivo] = useState(false)

  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState<any>('');
  const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');

  const param = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    if (param.matricula) {
      handleGetUsuario(param.matricula).then(res => {
        if (res.status == 200) {
          const data = res.response as UserOut
          setNome(data.nomeCompleto)
          setEmail(data.email)
          setFuncao(data.funcao)
          setTelefone(data.telefone)
          setAtivo(data.ativo)
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
  }, [ativo])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    var telefone = tel.replace("-", "").replace("(", "").replace(")", "").replace(" ", "")

    const user = {
      matricula: Number.parseInt(param.matricula!),
      nomeCompleto: nomeCompleto,
      telefone: telefone,
      funcao: funcao,
      email: email,
    }

    handleEditarUsuario(param.matricula!, user).then(res => {
      if (res.status === 200) {
        const data = res.response as UserOut
        setMessage(`Usuário ${data.nomeCompleto} Alterado com sucesso! Login com a matricula: ${data.matricula}`)
        setAlert(true)
        setAlertType('alert alert-success')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
          navigate('/usuarios')
        }, 2500)

      } else if (res.status !== 200) {
        const data = res.response as Error
        setMessage(data.Error)
        setAlert(true)
        setAlertType('alert alert-danger')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
        }, 5000)
      }
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    setTelefone(value);
  };

  const handleDeleteuser = () => {
    handleDeleteUserDb(param.matricula!).then(res => {
      if (res.status === 204) {
        setMessage(`Usuário excuido com sucesso`)
        setAlert(true)
        setAlertType('alert alert-success')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
          navigate('/usuarios')
        }, 2500)

      } else if (res.status !== 200) {
        const data = res.response as Error
        setMessage(data.Error)
        setAlert(true)
        setAlertType('alert alert-danger')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
        }, 5000)
      }
    });
  }

  const handleActiveuser = () => {
    handleActiveUser(param.matricula!).then(res => {
      if (res.status === 200) {
        setMessage(`Usuário  está autorizado a usar o sistema`)
        setAlert(true)
        setAtivo(true)
        setAlertType('alert alert-success')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
        }, 2500)

      } else if (res.status !== 200) {
        const data = res.response as Error
        setMessage(data.Error)
        setAlert(true)
        setAlertType('alert alert-danger')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
        }, 5000)
      }
    });
  }

  const handleResetarSenha = () => {
    handleResetarSenhaUser(param.matricula!).then(res => {
      if (res.status === 200) {
        setMessage(`Senha resetada com sucesso`)
        setAlert(true)
        setAlertType('alert alert-success')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
          navigate('/usuarios')
        }, 2500)

      } else if (res.status !== 200) {
        const data = res.response as Error
        setMessage(data.Error)
        setAlert(true)
        setAlertType('alert alert-danger')
        setTimeout(() => {
          setMessage('')
          setAlert(false)
          setAlertType('alert alert-primary')
        }, 5000)
      }
    });
  }

  return (
    <Container>
      <div className="w-50">
        {alert ? <Alert type={alertType} message={message} /> : ''}
        <form onSubmit={handleSubmit} className="w-100 p-5 rounded">
          <h4>Editar usuário</h4>
          <InputForm inputStyle="input" id="nome" placeholder="Nome Completo" set={(e) => setNome(e.target.value)} type="text" value={nomeCompleto} />
          <InputForm inputStyle="input" id="email" placeholder="Username" type="email" value={email} disabled={true} />
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
          <div className="d-flex mt-3 gap-4 justify-content-between">
            <button onClick={handleResetarSenha} type="button" className="btn btn-primary">Resetar senha</button>
            {
              ativo ?
                <button data-bs-toggle="modal" data-bs-target="#deleteModal" type="button" className="btn btn-danger">Excluir usuário</button> :
                <button onClick={handleActiveuser} type="button" className="btn btn-warning">Ativar usuário</button>
            }
            <button type="submit" className="btn btn-dark">Salvar as alterações</button>
          </div>
        </form>

        <div className="modal fade" id="deleteModal" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="deleteModalLabel">Excluir usuário</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Se você excluir esse usuário, pode ser necessário realizar um novo cadastro e será atribuida uma nova matricula</p>
                <p>Deseja mesmo excluir?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Não</button>
                <button onClick={handleDeleteuser} type="button" className="btn btn-danger" data-bs-dismiss="modal">Sim</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </Container>
  );
}

export default UsuarioPage;
