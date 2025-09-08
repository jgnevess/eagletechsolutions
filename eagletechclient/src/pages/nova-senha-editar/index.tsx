import { useEffect, useState } from "react";
import { handleAlterarSenhaUsuario, handleMudarSenha } from "../../service/user/userService";
import { redirect, useNavigate, useParams } from "react-router-dom";
import Alert, { PropsAlert } from "../../components/alert";
import Container from "../../components/container";
import { handleFirstLogin } from "../../service/firstlogin";
import { PasswordUpdate } from "../../service/user/user.models";


const EditarNovaSenha = () => {
    const [show, setShow] = useState(false);
    const [senha, setSenha] = useState('');
    const [confirmar, setConfirmar] = useState('');
    const [senhaAntiga, setAntiga] = useState('');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState<any>();
    const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');
    const navigate = useNavigate();

    const handleNewPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const matricula = Number.parseInt(sessionStorage.getItem("matricula")!);

        const payload = {
            matricula: matricula,
            oldPassword: senhaAntiga,
            newPassword: senha,
            confirmNewPassword: confirmar
        } as PasswordUpdate


        handleAlterarSenhaUsuario(payload).then(res => {
            if (res.status === 200) {
                setMessage("Sua senha foi alterada com sucesso!")
                setAlert(true)
                setAlertType('alert alert-success')
                setAntiga('')
                setConfirmar('')
                setSenha('')
                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                }, 2500)

            } else if (res.status === 400) {
                const data = res.response;
                console.log(res)
                setMessage(data)
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
            <>
                {alert ? <Alert type={alertType} message={message} /> : ''}

                <form onSubmit={handleNewPassword} className="form-content p-5 rounded">
                    <h4>Alterar senha</h4>
                    <div className="input-group input-group-lg mb-3">
                        <input
                            value={senhaAntiga}
                            onChange={(e) => setAntiga(e.target.value)}
                            type={show ? "text" : "password"}
                            className="form-control"
                            placeholder="Senha"
                        />
                        <button
                            onClick={() => setShow(!show)}
                            className="btn btn-outline-secondary"
                            type="button"><i className="bi bi-eye"></i></button>
                    </div>
                    <div className="input-group input-group-lg mb-3">
                        <input
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type={show ? "text" : "password"}
                            className="form-control"
                            placeholder="Senha"
                        />
                        <button
                            onClick={() => setShow(!show)}
                            className="btn btn-outline-secondary"
                            type="button"><i className="bi bi-eye"></i></button>
                    </div>
                    <div className="input-group input-group-lg mb-3">
                        <input
                            value={confirmar}
                            onChange={(e) => setConfirmar(e.target.value)}
                            type={show ? "text" : "password"}
                            className="form-control"
                            placeholder="Confirmar senha"
                        />
                        <button
                            onClick={() => setShow(!show)}
                            className="btn btn-outline-secondary"
                            type="button"><i className="bi bi-eye"></i></button>
                    </div>
                    <button type="submit" className="btn btn-dark">Alterar senha</button>
                </form>
            </>
        </Container>
    )
}

export default EditarNovaSenha;