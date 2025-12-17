from typing import List
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.chat_models import ChatOllama
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain.docstore.document import Document
from app.core.config import settings

embedding_function = OllamaEmbeddings(
    base_url=settings.OLLAMA_BASE_URL,
    model="llama3.2"
)

# Use valid Chroma settings. In client mode, we just need host/port if using HttpClient
# But langchain-chroma's interface is simpler. We'll use the HttpClient equivalent.
import chromadb
chroma_client = chromadb.HttpClient(host=settings.CHROMA_DB_HOST, port=settings.CHROMA_DB_PORT)

vectorstats = Chroma(
    client=chroma_client,
    collection_name="portfolio_collection",
    embedding_function=embedding_function,
)

class RAGService:
    def __init__(self):
        self.text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)

    async def ingest_file(self, content: str, source: str):
        docs = [Document(page_content=content, metadata={"source": source})]
        splits = self.text_splitter.split_documents(docs)
        vectorstats.add_documents(splits)

    async def get_relevant_splits(self, query: str) -> List[Document]:
        return vectorstats.similarity_search(query, k=3)

    async def generate_response(self, query: str, context_docs: List[Document]):
        # Simple generation using ChatOllama
        llm = ChatOllama(
            base_url=settings.OLLAMA_BASE_URL,
            model="llama3.2",
            temperature=0
        )
        
        context_text = "\n\n".join([doc.page_content for doc in context_docs])
        
        prompt = f"""You are a helpful assistant for this portfolio website.
Use the following context to answer the user's question. If you don't know the answer based on the context, answer generally or say you don't know.

Context:
{context_text}

User Question: {query}

Answer:"""
        
        # Streaming response
        async for chunk in llm.astream(prompt):
            yield chunk.content

rag_service = RAGService()
