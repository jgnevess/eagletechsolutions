import { GoogleGenerativeAI } from "@google/generative-ai";

const getGeminiKey = (): string => {
  return `${process.env.REACT_APP_GEMINI_KEY}`
}


const genAI = new GoogleGenerativeAI(getGeminiKey());
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

let chatSession = model.startChat({
  history: [],
  generationConfig: { maxOutputTokens: 200 }
});

const handleChatbot = async (userMessage: string) => {
  const result = await chatSession.sendMessage(userMessage);
  return result.response.text();
};

export { handleChatbot };
