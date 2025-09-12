import { ChatOllama } from "@langchain/community/chat_models/ollama";
import { ChatPromptTemplate } from "@langchain/core/prompts";


const mistralChat = new ChatOllama({
  baseUrl: "http://localhost:11434", 
  model: "mistral",                 
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant for a diagnostics web app.we have test like full body check up and covid ptpcr and many more"
  ],
  ["human", "Question: {question}\nAnswer:"]
]);

const chain = prompt.pipe(mistralChat);


export async function getAnswer(question) {
 
  const res = await chain.invoke({ question });
  return res.content;
}

export default getAnswer;

