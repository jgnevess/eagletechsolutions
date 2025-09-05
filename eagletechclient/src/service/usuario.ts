import axios, { AxiosError } from "axios";

const headers = () => {
    return {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}


const apiUrl = `${process.env.REACT_APP_API_URL}/api/Usuario
`
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
            headers: headers()
        })
        return { status: 200 };
    } catch (err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        return { status: 400, resposta: data};
    }
}


export { handleMudarSenha }