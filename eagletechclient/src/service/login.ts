import axios from "axios";

interface LoginResposta {
    Token: string
    Role: string
}

const apiUrl = "http://0.0.0.0:5000/api/Auth"
// const apiUrl = "http://18.222.140.8:5000/api/Auth"


const handleLoginAsync = async (matricula: string, senha: string): Promise<LoginResposta> => {
    const res = await axios.post<LoginResposta>(`${apiUrl}/login`, {
        matricula: matricula,
        senha: senha
    });
    return res.data;
}

export { handleLoginAsync }