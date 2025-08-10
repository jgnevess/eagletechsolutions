import React, { useState } from "react";
import { handleChatbot } from "../../service/chatbot";

interface Response {
    messageText: string
    messageType: string
}

const MainPage = () => {

    const [text, setText] = useState('');
    const [msg, setMsg]  = useState([]);
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        handleChatbot(text).then(response => {
            setMsg(response.data)
        });
        setText('')

    }

    const Msg = msg.map((response: Response) => {
        return (
            <div className={response.messageType == "SENT" ? 'w-50 py-2 border bg-dark text-light align-self-end m-2': 'w-50 m-2 py-2 border bg-dark text-light align-self-start'}>
                {response.messageText}
            </div>
        )
    })

    return (
        <div className="bg-dark w-100 d-flex flex-column justify-content-center align-items-center text-light" style={{
            minHeight: '100vh'
        }}>
            <div className="border w-75 rounded d-flex flex-column" style={{
                height: '75vh',
                overflowX: "auto"
            }}>
                {Msg}
            </div>
            <form onSubmit={handleSubmit} className="input-group mb-3 w-75">
                <input type="text" className="form-control bg-dark text-light" placeholder="Digite sua mensagem" value={text} onChange={(e) => setText(e.target.value)}/>
                <button className="btn btn-outline-secondary" type="submit">Button</button>
            </form>

        </div>
    )
}

export default MainPage;