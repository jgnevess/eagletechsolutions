import React, { useState } from "react";
import { Error, handleRegister, Usuario, UsuarioCadastro } from "../../service/login";
import Alert, { PropsAlert } from "../alert";


const CadastrarUsuario = () => {

    const [nomeCompleto, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTelefone] = useState('')
    const [funcao, setFuncao] = useState('SOLICITANTE')

    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [alertType, setAlertType] = useState<PropsAlert["type"]>('alert alert-primary');


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var telefone = tel.replace("-", "").replace("(", "").replace(")", "").replace(" ", "")

        const user = {
            nomeCompleto,
            senha: '',
            telefone,
            funcao,
            email
        } as UsuarioCadastro

        handleRegister(user).then(res => {
            if (res.status === 200) {
                const data = res.CadastroResposta as Usuario
                setMessage(`Usuário ${data.nomeCompleto} cadastrado com sucesso! Login com a matricula: ${data.matricula}`)
                setAlert(true)
                setAlertType('alert alert-success')
                setTimeout(() => {
                    setMessage('')
                    setAlert(false)
                    setAlertType('alert alert-primary')
                    sessionStorage.clear();
                }, 2500)

            } else if (res.status === 500) {
                const data = res.CadastroResposta as Error
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
        setTelefone(value);
    };

    return (
        <>
            {alert ? <Alert type={alertType} message={message} /> : ''}
            <form onSubmit={handleSubmit} className="w-100 form-content p-5 rounded">
                <div className="form-floating mb-3">
                    <input value={nomeCompleto} onChange={(e) => setNome(e.target.value)} type="text" className="form-control" id="nome" placeholder="Nome completo" />
                    <label htmlFor="nome">Nome completo</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="Email" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={tel} onChange={handleChange} type="text" className="form-control" id="telefone" placeholder="Telefone" />
                    <label htmlFor="telefone">Telefone</label>
                </div>
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
                    <button className="btn btn-dark">Cadastrar</button>
                </div>
            </form>
        </>

    )
}


export default CadastrarUsuario;