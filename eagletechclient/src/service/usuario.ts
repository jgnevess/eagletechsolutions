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
    resposta?: Error | Usuario | Usuario[] | UsuarioOut | ErrorEditar
}

export interface ErrorEditar {
    error: string
}

export interface Error {
    Error: string
}

export interface UsuarioOut {
    matricula: number;
    nomeCompleto: string;
    telefone: string;
    funcao: string;
    email: string;
}

export interface Usuario {
    matricula: number;
    nomeCompleto: string;
    telefone: string;
    funcao: string;
    email: string;
    firstLogin: boolean;
}

export interface UsuarioEditar {
    matricula: number;
    nomeCompleto: string;
    telefone: string;
    funcao: string;
    email: string;
}

interface PasswordUpdate {
    matricula: number;
    senhaAntiga: string;
    senhaNova: string;
    confirmacaoNova: string;
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
        return { status: 400, resposta: data };
    }
}

const handleGetAllUsuarios = async (pageNumber: number, pageSize: number): Promise<Resposta> => {
    const res = await axios.get<Usuario[]>(`${apiUrl}/Usuarios`, {
        params: {
            pageNumber: pageNumber,
            pageSize: pageSize
        },
        headers: headers()
    })
    return { status: res.status, resposta: res.data }
}

const handleGetAllUsuariosByNome = async (nome: string): Promise<Resposta> => {
    const res = await axios.get<Usuario[]>(`${apiUrl}/nome`, {
        params: {
            nome: nome
        },
        headers: headers()
    })
    return { status: res.status, resposta: res.data }
}

const handleGetUsuario = async (matricula: string): Promise<Resposta> => {
    try {
        const res = await axios.get<Usuario>(`${apiUrl}/matricula/${matricula}`, {
            headers: headers()
        });
        return { status: res.status, resposta: res.data }
    } catch (err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        return { status: 400, resposta: data };
    }
}


const handleAlterarSenhaUsuario = async (pu: PasswordUpdate): Promise<Resposta> => {
    try {
        const res = await axios.put(`${apiUrl}/alterar-senha`, pu, {
            headers: headers()
        });
        return { status: res.status }
    } catch (err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        return { status: 400, resposta: data };
    }
}

const handleEditarUsuario = async (matricula: string, Usuario: UsuarioEditar): Promise<Resposta> => {
    try {
        const res = await axios.put<Usuario>(`${apiUrl}/editar/${matricula}`, Usuario, {
            headers: headers()
        });
        return { status: res.status, resposta: res.data }
    } catch (err) {
        const error = err as AxiosError;
        const data = error.response?.data as Error
        return { status: 400, resposta: data };
    }
}

export { handleMudarSenha, handleGetAllUsuarios, handleGetUsuario, handleGetAllUsuariosByNome, handleEditarUsuario, handleAlterarSenhaUsuario }