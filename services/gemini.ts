import { GoogleGenAI } from "@google/genai";
import { AiResponse } from "../types";

const apiKey = process.env.API_KEY || '';

const ai = new GoogleGenAI({ apiKey });

export const searchGrayCodeInfo = async (query: string): Promise<AiResponse> => {
  try {
    const modelId = 'gemini-3-flash-preview';
    
    const response = await ai.models.generateContent({
      model: modelId,
      contents: query,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: `You are an expert mathematician and computer scientist specializing in digital logic and coding theory. 
        Provide concise, accurate, and up-to-date information about Gray Codes, their history, applications (like rotary encoders, Karnaugh maps, error correction), and properties.
        When using Google Search, explicitly summarize the findings. Format your response with Markdown.`,
      },
    });

    const text = response.text || "No response generated.";
    
    // Extract sources from grounding chunks
    const sources: { title: string; url: string }[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    chunks.forEach((chunk: any) => {
      if (chunk.web?.uri && chunk.web?.title) {
        sources.push({
          title: chunk.web.title,
          url: chunk.web.uri,
        });
      }
    });

    return { text, sources };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return { 
      text: "Error fetching data from Gemini. Please check your API key and connection.", 
      sources: [] 
    };
  }
};