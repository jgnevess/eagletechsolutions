import axios, { AxiosError } from "axios";

interface Resposta {
    status: number
    LoginResposta?: LoginResposta | Erro
}

interface Erro {
    Message: string
}

interface LoginResposta {
    Token: string
    Role: string
}

const apiUrl = "http://0.0.0.0:5000/api/Auth"
// const apiUrl = "http://18.222.140.8:5000/api/Auth"


const handleLoginAsync = async (matricula: string, senha: string): Promise<Resposta> => {
    try {
        const res = await axios.post<LoginResposta>(`${apiUrl}/login`, {
            matricula: matricula,
            senha: senha
        });
        return { status: 200, LoginResposta: res.data};
    } catch(err) {
        const error = err as AxiosError;
        const data = error.response?.data as string
        console.log(error)
        return { status: 400 }
    }
}

export { handleLoginAsync }