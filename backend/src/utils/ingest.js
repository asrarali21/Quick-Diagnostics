import {Document} from "@langchain/document"
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"
import {OllamaEmbeddings} from "@langchain/community/embeddings/ollama"
import {Chroma} from "@langchain/community/vectorstores/chroma"

import axios from "axios"

  //ye banati vector store for RAG
const ingestDocs = async() =>{
    console.log("starting ingestion");


    //ingestion karne se pehle data fetch karna jo data hona hai uska endpoint
    //step 1: ye hai step 1 data fetch karna
    const TestData = await axios.get("http://localhost:8000/api/v1/tests/alltests")
    console.log(TestData);
     

    if (!TestData) {
       console.log("No Data Found to Ingest");
    }

    //step 2 : jo jo bhi data hai usku format kardene langchain ke document object ku 
    // uskan 2 main attribute rehte "page_content" aur Meta Data 

    const document = TestData.map((item)=>{
       const pageContent = `Test Name: ${item.testName}\nDescription: ${item.description}\nPrice: ${test.price}\nReportTime: ${test.report_time}\n Disclaimers :${item.disclaimers}`;


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

    const embedding = new OllamaEmbeddings({
         model: "mistral", 
    baseUrl: "http://localhost:11434"
    })


    // step 5 : embedding aur documents store karna in ChromaDB
    // ChromaDB is a popular choice for a local vector store

     const vectorStore = await Chroma.fromDocuments(splitDocument, embedding, {
    collectionName: "tests-knowledge-base",
  });

    console.log("Ingestion complete! The knowledge base has been created.");
   
}

ingestDocs().catch(console.error)