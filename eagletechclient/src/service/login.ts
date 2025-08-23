import axios, { AxiosError } from "axios";

export interface Resposta {
    status: number
    LoginResposta?: LoginResposta | Error
    CadastroResposta?: Usuario | Error
}

export interface Usuario {
  matricula: number;
  nomeCompleto: string;
  telefone: string;
  funcao: string;
  email: string;
}

export interface LoginResposta {
    Token: string
    Role: string
    FirstLogin: boolean
    Matricula: number
    usuario: Usuario
}

export interface Error {
    Error: string
}

export type Role = "SOLICITANTE" | "ADMIN" | "TECNICO";

export interface UsuarioCadastro {
  nomeCompleto: string;
  senha: string;
  telefone: string;
  funcao: Role;
  email: string;
}


const apiUrl = `${process.env.REACT_APP_API_URL}api/Auth`

const handleLoginAsync = async (matricula: string, senha: string): Promise<Resposta> => {
    try {
        const res = await axios.post<LoginResposta>(`${apiUrl}/login`, {
            matricula: matricula,
            senha: senha
        });
        return { status: 200, LoginResposta: res.data};
    } catch(err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        return { status: 400, LoginResposta: data }
    }
}

const handleRegister = async (user: UsuarioCadastro): Promise<Resposta> => {
    console.log(user)
    try {
        const res = await axios.post<Usuario>(`${apiUrl}/register`, user);
        return { status: 200, CadastroResposta: res.data};
    } catch(err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        console.log(data)
        return { status: 500, CadastroResposta: data }
    }
}

export { handleLoginAsync, handleRegister }