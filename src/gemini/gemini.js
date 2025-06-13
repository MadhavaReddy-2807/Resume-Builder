// require('dotenv').config();
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
}  from "@google/generative-ai";

console.log(import.meta.env.VITE_GOOGLE_AI_API)
const apiKey = import.meta.env.VITE_GOOGLE_AI_API;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
});

const generationConfig = {
  temperature: 1.5,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};
export const AIchatSession = model.startChat({
  generationConfig,
});