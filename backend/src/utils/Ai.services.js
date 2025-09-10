import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Create the local chat model (Ollama must be running: `ollama run mistral`)
const mistralChat = new ChatOllama({
  baseUrl: "http://localhost:11434", // default
  model: "mistral",                  // or "mistral:instruct"
  temperature: 0.7,
});

// Prompt template with a variable {question}
const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant for a diagnostics web app. Be concise and avoid giving medical diagnoses—only general guidance."
  ],
  ["human", "Question: {question}\nAnswer:"]
]);

// Build chain (prompt -> model)
const chain = prompt.pipe(mistralChat);

// Public helper
export async function getAnswer(question) {
  // chain.invoke returns a BaseMessage; .content holds the text
  const res = await chain.invoke({ question });
  return res.content;
}

export default getAnswer;

