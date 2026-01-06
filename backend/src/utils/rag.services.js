import { ChatGoogleGenerativeAI, GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";




//answering based on the knowledge base 

export async function answerFromKb(question, k = 5) {

    console.log(question);

    if (!question || !question.trim()) {
        return { answer: "please provide a question", source: [] }
    }

    // 1) connnect to vector db which weaviate in my case

    const embedding = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GOOGLE_API_KEY,
        model: "text-embedding-004"
    })

    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    })

    const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX_NAME)

    const store = new PineconeStore(embedding, {
        pineconeIndex,
        namespace: "test-knowledge",
    })


    const docs = await store.similaritySearch(question, k);
    if (!docs?.length) {
        return { answer: "I don't know based on the current knowledge base.", sources: [] };
    }

    const context = docs.map((d, i) => `chunk ${i + 1} (Test : ${d.metadata?.test_name || "N/A"}):\n${d.pageContent} )`).join("\n\n")


    const chat = new ChatGoogleGenerativeAI({
        model: "gemini-2.5-flash",
        apiKey: process.env.GEMINI_API_KEY
    })


    const prompt = [
        {
            role: "system",
            content: "You are a helpful assistant for a diagnostics web app. Answer ONLY using the provided context. If the answer is not in the context, say you don't know."
        },
        {
            role: "user",
            content: `context : \n${context} \n\nQuestion : ${question} answer in 3-6 consise sentences`
        }
    ]


    const res = await chat.invoke(prompt)

    const answer = typeof res.content === "string" ? res.content : (Array.isArray(res.content) ? res.content.map(p => p.text || "").join("\n") : "");

    const sources = docs.map(d => ({
        test_id: d.metadata?.test_id,
        test_name: d.metadata?.test_name,
    }))


    return { answer, sources }

}