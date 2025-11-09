import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";
config()

const ai = new GoogleGenAI({apiKey : process.env.GEMINI_API_KEY});

export async function autoTranslateWithAI(caption) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Translate this caption if its in English to hindi and if its in english to hindi with same word length and only return the output of caption no greeting no nothing, Here you go :
     ${caption}`,
  });
  return response.text
}