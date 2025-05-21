import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { customProvider } from "ai";

interface ChatModel {
  id: string;
  name: string;
  description: string;
}

export const DEFAULT_CHAT_MODEL: string = "gemini-2.0-flash";

export const chatModels: Array<ChatModel> = [
  {
    id: "gemini-2.0-flash",
    name: "gemini-2.0-flash",
    description: "次世代の機能と強化された機能を提供",
  },
  {
    id: "gpt-4o",
    name: "gpt-4o",
    description: "汎用性と知能に優れたフラッグシップモデル",
  },
];

export const myProvider = customProvider({
  languageModels: {
    "gemini-2.0-flash": google("gemini-2.0-flash"),
    "gpt-4o": openai("gpt-4o"),
  },
});
