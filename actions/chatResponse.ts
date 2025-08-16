import { GoogleGenAI } from "@google/genai";

import { davidGogginsSystemContext } from "@/system_contexts/davidGoggins";
import { elonMuskSystemContext } from "@/system_contexts/elonMusk";
import { hiteshSirSystemContext } from "@/system_contexts/hiteshSir";
import { manuPaajiSystemContext } from "@/system_contexts/manuPaaji";
import { piyushSirSystemContext } from "@/system_contexts/piyushSir";
import { presidentObamaSystemContext } from "@/system_contexts/presidentObama";
import { presidentTrumpSystemContext } from "@/system_contexts/presidentTrump";
import { steveJobsSystemContext } from "@/system_contexts/steveJobs";

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const systemContexts = {
  "david-goggins": davidGogginsSystemContext,
  "elon-musk": elonMuskSystemContext,
  "hitesh-sir": hiteshSirSystemContext,
  "manu-paaji": manuPaajiSystemContext,
  "piyush-sir": piyushSirSystemContext,
  "president-obama": presidentObamaSystemContext,
  "president-trump": presidentTrumpSystemContext,
  "steve-jobs": steveJobsSystemContext,
};

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  timestamp: Date;
}

export type Persona =
  | "david-goggins"
  | "elon-musk"
  | "hitesh-sir"
  | "manu-paaji"
  | "piyush-sir"
  | "president-obama"
  | "president-trump"
  | "steve-jobs";

async function generateChatResponse(messages: Message[], persona: Persona) {
  try {
    const formattedContents = messages.map((msg) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: formattedContents,
      config: {
        systemInstruction: systemContexts[persona],
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
}

export default generateChatResponse;
