import React, { useEffect, useState } from "react";
import { handleChatbot, handleMessages } from "../../service/chatbot";
import { Link, useNavigate, useParams } from "react-router-dom";
import { handleBuscarChamado } from "../../service/chamado";
import { useFirstLogin } from "../../hooks/useFirstLogin";

interface Response {
    id: number;
    numeroChamado: number;
    conversation: Message[];
}

interface Message {
    chatbotId: number
    messageText: string;
    messageType: string;
    id: number
}

const ChatPage = () => {
    const [text, setText] = useState("");
    const [msg, setMsg] = useState<Response | null>(null);
    const [disabledInput, setDisabledInput] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    useFirstLogin();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await handleChatbot(text, Number.parseInt(param.numeroChamado!));

            const messagesResponse = await handleMessages(Number.parseInt(param.numeroChamado!));
            setMsg(messagesResponse);
        } catch (error) {
            console.error("error");
        }
        setText("");
    };


    useEffect(() => {
        const fetchMessages = async () => {
            if (
                msg?.conversation?.some(
                    (m) =>
                        m.messageText === "Seu chamado foi encerrado" ||
                        m.messageText === "Seu chamado será aberto e um técnico já vai atende-lo"
                )
            ) {
                setDisabledInput(true);
            } else {
                setDisabledInput(false);
            }

            const messagesResponse = await handleMessages(Number.parseInt(param.numeroChamado!));
            if(!messagesResponse) {
                navigate('/notfound')
            }
            setMsg(messagesResponse);
        };

        fetchMessages();
    }, [msg]);


    const handleAutoResponse = async (text: string) => {
        try {
            const chatbotResponse = await handleChatbot(text, Number.parseInt(param.numeroChamado!));
            setMsg(chatbotResponse);
        } catch (error) {
            console.error("error");
        }
    };

    useFirstLogin();

    const Msg = (msg?.conversation ?? []).map((response: Message, key) => (
        <React.Fragment key={key}>
            <div
                className={
                    response.messageType === "SENT"
                        ? "w-50 py-2 border rounded-start bg-info text-light align-self-end my-2"
                        : "w-50 my-2 py-2 border bg-primary rounded-end text-light align-self-start"
                }
            >
                {response.messageText}
            </div>
            {response.messageType === "SOLVED" && (
                <div className="d-flex justify-content-end gap-2">
                    <button disabled={disabledInput} onClick={() => handleAutoResponse("sim")} className="btn btn-danger">
                        sim
                    </button>
                    <button disabled={disabledInput} onClick={() => handleAutoResponse("não")} className="btn btn-danger">
                        não
                    </button>
                </div>
            )}
        </React.Fragment>
    ));

    return (
        <div
            className="bg-dark w-100 d-flex flex-column justify-content-center align-items-center text-light"
            style={{ minHeight: "100vh" }}
        >
            <div
                className="border w-75 rounded d-flex flex-column"
                style={{ height: "75vh", overflowY: "auto" }}
            >
                {Msg.length > 0 ? Msg : <p className="text-center mt-3">Nenhuma mensagem ainda.</p>}
            </div>
            <form onSubmit={handleSubmit} className="input-group mb-3 w-75">
                <input
                    disabled={disabledInput}
                    type="text"
                    className="form-control bg-dark text-light"
                    placeholder="Digite sua mensagem"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    autoComplete="off"
                />
                <button disabled={disabledInput} className="btn btn-outline-secondary" type="submit">
                    Enviar
                </button>
            </form>
            <Link className="btn btn-danger" to={'/'}>Voltar</Link>
        </div>
    );
};

export default ChatPage;
