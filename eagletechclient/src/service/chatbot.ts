import axios, { AxiosError } from "axios";
import { text } from "stream/consumers";



const handleChatbot = async (text: string): Promise<any> => {
    try {
        const response = await axios.post("http://localhost:5009/Chatbot", {text: text});
        return response

    } catch(error) {
        return [];
    }
}


export { handleChatbot }