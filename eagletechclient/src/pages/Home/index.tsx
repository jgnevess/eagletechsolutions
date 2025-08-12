import React, { useState } from "react";
import { handleAbrirChamado } from "../../service/chamado";
import { useNavigate } from "react-router-dom";



const NovoChamado = () => {

    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleAbrirChamado({titulo: titulo, descricao: descricao}).then(response => {
            navigate(`/chat/${response.numeroChamado}`)
        })
    }

    return (
        <div className="w-100 bg-dark text-light d-flex justify-content-center flex-column align-items-center" style={{
            height: '100vh'
        }}>
            <form onSubmit={handleSubmit} className="w-50">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Titulo</label>
                    <input type="text" className="form-control bg-dark text-light" id="exampleFormControlInput1"
                        value={titulo} onChange={(e) => setTitulo(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Descrição do chamado</label>
                    <textarea className="form-control bg-dark text-light" id="exampleFormControlTextarea1" style={{
                        resize: 'none',
                        height: '35vh'
                    }}
                    required={true}
                    value={descricao} onChange={(e) => setDescricao(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                    <button type="submit" className="btn btn-dark">Abrir Chamado</button>
                </div>
            </form>
        </div>
    )
}

export default NovoChamado;