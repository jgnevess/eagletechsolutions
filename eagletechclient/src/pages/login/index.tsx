import React, { useEffect, useState } from "react";
import { Error, handleLoginAsync, LoginResposta } from "../../service/login";
import { useNavigate } from "react-router-dom";
import Alert, { PropsAlert } from "../../components/alert";
import Container from "../../components/container";


const LoginPage = () => {


    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');
    const [showSenha, setShowSenha] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if(sessionStorage.length > 0) {
            sessionStorage.clear();
            window.location.href = '/login'
        }
    },[])

    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleLoginAsync(matricula, senha).then(res => {
            if (res.status === 200) {
                const data = res.LoginResposta as LoginResposta
                sessionStorage.setItem("token", data.Token);
                sessionStorage.setItem("role", data.Role);
                sessionStorage.setItem("matricula", data.Matricula.toLocaleString())
                sessionStorage.setItem("usuario", JSON.stringify(data.usuario));
                sessionStorage.setItem("first", JSON.stringify(data.FirstLogin));

                if (data.FirstLogin) {
                    navigate('/nova-senha')
                }
                else {
                    if(data.Role === "ADMIN") {
                        return navigate('/')
                    }

                    if(data.Role === "TECNICO") {
                        return navigate('/')
                    }

                    if(data.Role === "SOLICITANTE") {
                        return navigate('/');
                    }
                    
                    return navigate('/');
                }

            } else if (res.status === 400) {
                const data = res.LoginResposta as Error
                setMessage(data.Error)
                setAlert(true)
                setAlertType('alert alert-danger')

                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                }, 2500)
            }
        });

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const apenasNumeros = e.target.value.replace(/[^0-9]/g, "");
        setMatricula(apenasNumeros);
    };


    return (
        <Container>
            <>
                {alert ? <Alert type={alertType} message={message} /> : ''}
                <form onSubmit={handleLogin} className="form-content p-5 rounded">
                    <h1 className="mb-5">Login</h1>
                    <div className="input-group input-group-lg mb-3">
                        <span className="input-group-text" id="visible-addon"><i className="bi bi-person-circle"></i></span>
                        <input pattern="[0-9]+" value={matricula} onChange={handleChange} type="text" className="form-control py-3" id="floatingInput" placeholder="matricula" />
                    </div>
                    <div className="mb-3">
                        <div className="input-group input-group-lg mb-3">
                            <span className="input-group-text" id="visible-addon"><i className="bi bi-shield-lock-fill"></i></span>
                            <input
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                type={showSenha ? "text" : "password"}
                                className="form-control py-3"
                                placeholder="Senha"
                            />
                            <button
                                className="btn btn-light"
                                type="button"
                                onClick={() => setShowSenha(!showSenha)}
                            >
                                <i className="bi bi-eye"></i>
                            </button>
                        </div>
                    </div>
                    <div className="d-grid gap-2">
                        <button className="btn btn-dark btn-lg">Entrar</button>
                    </div>
                </form>
            </>
        </Container>
    )
}

export default LoginPage;