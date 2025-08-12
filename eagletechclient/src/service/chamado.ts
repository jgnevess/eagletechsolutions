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

// const apiUrl = "http://0.0.0.0:5000/api/Chamados"
const apiUrl = "http://18.222.140.8:5000/api/Chamados"

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