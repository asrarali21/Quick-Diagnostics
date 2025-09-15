import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatPromptTemplate } from "@langchain/core/prompts";


const geminiChat = new ChatGoogleGenerativeAI({ 
  model: "gemini-1.5-flash",   
  apiKey: process.env.GEMINI_API_KEY,              
  temperature: 0.7,
});

const prompt = ChatPromptTemplate.fromMessages([
  [
    "system",
    "You are a helpful assistant for a diagnostics web app.we have test like full body check up and covid ptpcr and many more"
  ],
  ["human", "Question: {question}\nAnswer:"]
]);

const chain = prompt.pipe(geminiChat);


export async function getAnswer(question) {
 
  const res = await chain.invoke({ question });
  return res.content;
}

export default getAnswer;

