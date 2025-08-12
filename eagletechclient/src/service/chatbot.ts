import axios from "axios";


// const apiUrl = "http://0.0.0.0:5000/Chatbot"
const apiUrl = "http://18.222.140.8:5000/Chatbot"

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
