import axios, { AxiosError } from "axios"
import { Error } from "./login"

const headers = () => {
    return {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }
}

export interface Usuario {
  matricula: number;
  nomeCompleto: string;
  telefone: string;
  funcao: string;
  email: string;
}

export interface ChamadoDatails {
  numeroChamado: number;
  titulo: string;
  descricao: string;
  status: string;
  prioridade: string;
  categoria: string;
  abertura: string;   
  fechamento: string; 
  solicitante: Usuario;
  tecnico: Usuario | null;
}


export interface Response {
    status: number
    data?: ChamadoAberto | Error | ChamadoDatails[]
}

export interface Chamado {
    titulo: string
    descricao: string
    categoria: Categoria
    usuarioId: number
}

export enum Categoria {
    HARDWARE = "HARDWARE",
    SOFTWARE = "SOFTWARE",
    REDE = "REDE",
    IMPRESSORA = "IMPRESSORA",
    SISTEMA_OPERACIONAL = "SISTEMA_OPERACIONAL",
    BANCO_DE_DADOS = "BANCO_DE_DADOS",
    SEGURANCA = "SEGURANCA",
    OUTROS = "OUTROS",
}


export interface ChamadoAberto {
    numeroChamado: number
    titulo: string
    descricao: string
}

const apiUrl = `${process.env.REACT_APP_API_URL}api/Chamados`


const handleAbrirChamado = async (chamado: Chamado): Promise<Response> => {
    try {
        const response = await axios.post<ChamadoAberto>(`${apiUrl}/abrir-chamado`, chamado, {
            headers: headers()
        });
        return {status: response.status, data: response.data};
    } catch (err) {
        const error = err as AxiosError
        const data = error.response?.data as Error
        return {status: error.response?.status!, data: data}
    }
}

const handleChamadosByMatricula = async (matricula: number): Promise<Response>  => {
    try {
        const response = await axios.get<ChamadoDatails[]>(`${apiUrl}/chamados-solicitante`, {
            headers: headers(),
            params: {
                solicitante: matricula,
                status: 'ABERTO'
            }
        })
        return {status: response.status, data: response.data}
    } catch (err) {
        const error = err as AxiosError
        const data = error.response?.data as Error
        return {status: error.response?.status!, data: data}
    }
}

const handleBuscarChamado = async (numeroChamado: number): Promise<ChamadoAberto> => {
    const response = await axios.get<ChamadoAberto>(`${apiUrl}/BuscarTodos`, {
        params: {
            numeroChamado: numeroChamado
        },
        headers: headers()
    })
    return response.data;
}

export { handleAbrirChamado, handleBuscarChamado, handleChamadosByMatricula }