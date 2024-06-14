import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_KEY } from "../config";

const genAi = new GoogleGenerativeAI(GEMINI_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
model.generationConfig.maxOutputTokens = 400; // 500 tokens is around the 2k char limit from discord.js

export async function getResponseStream(prompt: string) {
  const response = await model.generateContentStream(prompt);
  return response.stream;
}