
import { GoogleGenAI } from "@google/genai";
import { BotConfig, Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getBotResponse = async (
  userMessage: string,
  history: Message[],
  config: BotConfig
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview';
    const systemInstruction = `
      You are "${config.name}", the professional AI assistant for Applemar.
      Applemar Brand Personality: Luxury, minimalist, elegant, and efficient.
      Context: ${config.businessContext}
      Your Personality: ${config.personality}
      Rules:
      1. Always be polite and professional in Portuguese (Brazil/Portugal).
      2. If you don't know an answer, politely ask the customer to wait for a human agent.
      3. Keep responses concise and well-formatted.
      4. Avoid slang unless it fits the high-end brand image.
    `;

    const chatHistory = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    }));

    const response = await ai.models.generateContent({
      model: model,
      contents: [
        ...chatHistory,
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.95,
      },
    });

    return response.text || "Desculpe, tive um problema técnico. Um consultor humano entrará em contacto em breve.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Lamentamos, mas não conseguimos processar a sua mensagem no momento. Por favor, tente novamente mais tarde.";
  }
};
