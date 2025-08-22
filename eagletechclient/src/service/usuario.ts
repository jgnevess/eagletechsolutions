import axios, { AxiosError } from "axios";

const apiUrl = "http://0.0.0.0:5000/api/Usuario"
// const apiUrl = "http://18.222.140.8:5000/api/Usuario"

interface SimplePasswordUpdate {
    matricula: number
    senhaNova: string
    confirmacaoNova: string
}

interface Resposta {
    status: number
    resposta?: Error 
}

interface Error {
    Error: string
}

const handleMudarSenha = async (spu: SimplePasswordUpdate): Promise<Resposta> => {
    try {
        const res = await axios.put(`${apiUrl}/nova-senha`, spu, {
            headers: {}
        })
        return { status: 200 };
    } catch (err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        return { status: 400, resposta: data};
    }
}


export { handleMudarSenha }