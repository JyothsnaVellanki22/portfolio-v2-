# Portfolio & GenAI Chatbot

A modern, full-stack portfolio website featuring an integrated **RAG (Retrieval-Augmented Generation) Chatbot**.  
The project demonstrates robust software engineering practices, combining a responsive frontend with a complex AI-powered backend.

## 🚀 Features

### 1. Portfolio Website (Frontend)
- **Framework**: React 19 + Vite for high-performance rendering.
- **Styling**: Vanilla CSS with a custom design system (Dark Graphite/Violet theme).
- **UX**: "Spotlight" cursor effects, responsive grid layouts, and seamless navigation.
- **Components**: Modular architecture (Sidebar, Projects, Experience, Archive).

### 2. GenAI Chatbot (Backend & AI)
- **Architecture**: Full RAG pipeline running locally.
- **Local LLM**: Integrated with **Ollama** (Llama 3.2) for privacy-first, free inference.
- **Vector Database**: **ChromaDB** for storing and retrieving embedded documents.
- **Context Awareness**: The bot answers questions about my skills, projects, and experience by retrieving real data from my portfolio.
- **Persistence**: PostgreSQL database stores conversation history (User & AI messages).

## 🛠 Tech Stack

### Frontend
- **React** / **Vite**
- **JavaScript (ES6+)**
- **Vanilla CSS** (Variables, Flexbox, Grid)
- **State Management**: React Hooks (useState, useEffect, useContext)

### Backend API
- **Python 3.10**
- **FastAPI**: Sync/Async endpoints, Pydantic validation.
- **SQLAlchemy (Async)**: ORM for PostgreSQL.
- **LangChain**: Framework for RAG pipeline and LLM orchestration.
- **Server-Sent Events (SSE)**: For streaming real-time chat responses.

### Infrastructure & Database
- **Docker & Docker Compose**: Orchestrates Backend, Postgres, and ChromaDB containers.
- **PostgreSQL**: Relational data storage (Conversations, Messages).
- **ChromaDB**: Vector data storage (Embeddings).
- **Ollama**: Local Inference Server.

## 🏃‍♂️ Getting Started

### Prerequisites
1.  **Node.js** (v16+)
2.  **Docker Desktop** (Running)
3.  **Ollama** (Installed locally on host)

### 1. Setup Ollama (Local AI)
The chatbot relies on your machine's local AI model.
```bash
# Pull the model
ollama pull llama3.2

# Run Ollama (Required for Docker connectivity)
OLLAMA_HOST=0.0.0.0 ollama serve
```

### 2. Start the Application
Run the full stack with one command:
```bash
# Start Backend, DB, and VectorDB
docker-compose up -d --build

# Start Frontend
cd portfolio
npm install
npm run dev
```

- **Frontend**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8003/docs](http://localhost:8003/docs)

## 📂 Project Structure

```bash
.
├── backend/                # FastAPI Application
│   ├── app/
│   │   ├── api/            # Routes (Auth, Chat)
│   │   ├── core/           # Config & Security
│   │   ├── db/             # Database Models & Session
│   │   └── services/       # RAG Pipeline (Ollama/LangChain)
│   ├── Dockerfile
│   └── requirements.txt
├── portfolio/              # React Frontend
│   ├── src/
│   │   ├── components/     # ChatWindow, ChatWidget, etc.
│   │   └── services/       # API Clients
│   └── vite.config.js
├── docker-compose.yml      # Service Orchestration
└── README.md
```
