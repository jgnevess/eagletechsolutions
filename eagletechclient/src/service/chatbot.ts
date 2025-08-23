import axios from "axios";

const apiUrl = `${process.env.REACT_APP_API_URL}Chatbot`

const handleChatbot = async (text: string, numeroChamado: number): Promise<any> => {
  try {
    const response = await axios.post(
      `${apiUrl}`,
      { text },
      {
        params: { numeroChamado },
      }
    );
    return response.data;
  } catch (error: any) {
    return 404
  }
};

const handleMessages = async (numeroChamado: number): Promise<any> => {
  try {
    const response = await axios.get(`${apiUrl}`, {
      params: { numeroChamado },
    });
    return response.data;
  } catch (error: any) {
    return 404
  }
};

export { handleChatbot, handleMessages };
