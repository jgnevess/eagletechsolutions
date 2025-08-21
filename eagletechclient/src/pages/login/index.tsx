import React, { useState } from "react";
import { handleLoginAsync } from "../../service/login";


const LoginPage = () => {

    const [matricula, setMatricula] = useState('');
    const [senha, setSenha] = useState('');


    const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleLoginAsync(matricula, senha).then(res => {
            alert(res.Role);
            alert(res.Token);
        });

    }


    return (
        <div className="w-100 bg-dark text-light d-flex justify-content-center flex-column align-items-center" style={{
            height: '100vh'
        }}>
            <form onSubmit={handleLogin} className="w-25">
                <h2>Login</h2>
                <div className="form-floating mb-3">
                    <input value={matricula} onChange={(e) => setMatricula(e.target.value)} type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Matricula</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={senha} onChange={(e) => setSenha(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Senha</label>
                </div>
                <div className="d-grid gap-2">
                    <button className="btn btn-primary btn-lg">login</button>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;