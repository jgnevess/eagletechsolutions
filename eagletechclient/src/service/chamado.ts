import axios from "axios"

interface Chamado {
    titulo: string
    descricao: string
}

interface ChamadoAberto {
    numeroChamado: number
    titulo: string
    descricao: string
}

const apiUrl = `${process.env.REACT_APP_API_URL}api/Chamados`


const handleAbrirChamado = async (chamado: Chamado): Promise<ChamadoAberto> => {
    const response = await axios.post<ChamadoAberto>(`${apiUrl}`, chamado);
    return response.data;
}

const handleBuscarChamado = async (numeroChamado: number): Promise<ChamadoAberto> => {
    const response = await axios.get<ChamadoAberto>(`${apiUrl}/BuscarTodos`, {
        params: {
            numeroChamado: numeroChamado
        }
    })
    return response.data;
}

export { handleAbrirChamado, handleBuscarChamado }