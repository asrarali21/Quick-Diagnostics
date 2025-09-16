import {Document} from "@langchain/core/documents"
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { WeaviateStore } from "@langchain/weaviate";
import { connectToCustom } from "weaviate-client";
import axios from "axios"
import path from "node:path";
import { fileURLToPath } from "node:url";
import { config as dotenvConfig } from "dotenv";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenvConfig({ path: path.resolve(__dirname, "../../.env") });
 
  //ye banati vector store for RAG
const ingestDocs = async() =>{


   
    console.log("starting ingestion");


    //ingestion karne se pehle data fetch karna jo data hona hai uska endpoint
    //step 1: ye hai step 1 data fetch karna
    const response = await axios.get("http://localhost:8000/api/v1/tests/alltests")
    const TestData = response.data.data;
    console.log(TestData);

     

    if (!TestData) {
       console.log("No Data Found to Ingest");
    }

    //step 2 : jo jo bhi data hai usku format kardene langchain ke document object ku 
    // uskan 2 main attribute rehte "page_content" aur Meta Data 

    const document = TestData.map((item)=>{
       const pageContent = `Test Name: ${item.testName}\nDescription: ${item.description}\nPrice: ${item.price}\nReportTime: ${item.report_time}\n Disclaimers :${item.disclaimers}`;


         const metadata = {
      test_id: item._id,
      test_name: item.testName
    };
     return new Document({pageContent , metadata })
    })

   

    //step 3 : abbh hai spitting ki bari document to smaller chunks mein split karne 
    // and langchain provides you with spillting 

    const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
    })


    const splitDocument = await splitter.splitDocuments(document)



    //step 4 : abbh embedding create karna konsa toh bhi model use karke 

  const embeddings = new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GEMINI_EMBED_MODEL || "text-embedding-004", // or "gemini-embedding-001"
  })


    // step 5 : embedding aur documents store karna in ChromaDB
    // ChromaDB is a popular choice for a local vector store
const client = await connectToCustom({
  http: { host: process.env.WEAVIATE_HTTP_HOST || "localhost:8080", secure: false },
  grpc: { host: process.env.WEAVIATE_GRPC_HOST || "localhost:50051", secure: false },
})


  const vectorStore = await WeaviateStore.fromDocuments(splitDocument, embeddings, {
        client,                      // Pass the initialized Weaviate client
        indexName: "tests_knowledge_base",   // Your class name (index name)
          textKey: "text", // where pageContent is stored
    metadataKeys: ["test_id", "test_name"],           // The property in schema where content is stored
    
  });

    console.log("Ingestion complete! The knowledge base has been created.");
   
}

ingestDocs().catch(console.error)