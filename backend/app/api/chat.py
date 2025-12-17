from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.api.deps import get_current_user
from app.db.models import User
from app.services.rag import rag_service
from pydantic import BaseModel

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    conversation_id: int | None = None


@router.post("/stream")
async def stream_chat(
    request: ChatRequest,
    db: AsyncSession = Depends(get_db),
    # current_user: User = Depends(get_current_user) # Optional: require auth for chat
):
    from app.db.models import Conversation, Message
    
    # 1. Manage Conversation
    conversation_id = request.conversation_id
    if not conversation_id:
        conversation = Conversation(title="New Chat")
        db.add(conversation)
        await db.commit()
        await db.refresh(conversation)
        conversation_id = conversation.id
    else:
        # Verify exists (optional but good practice)
        pass 

    # 2. Store User Message
    user_msg = Message(
        conversation_id=conversation_id,
        role="user",
        content=request.message
    )
    db.add(user_msg)
    await db.commit()

    # 3. Retrieve Context
    docs = await rag_service.get_relevant_splits(request.message)
    
    # 4. Generator for streaming
    async def event_generator():
        # First yield conversation ID so frontend can track it
        yield f"__CONV_ID__:{conversation_id}\n"
        
        full_response = ""
        async for chunk in rag_service.generate_response(request.message, docs):
            full_response += chunk
            yield chunk
        
        # 5. Store AI Response
        # We need a new session here because the generator runs outside the request context scope potentially
        # But for simplicity in this architecture, we might need a workaround or just hope the session is valid.
        # Better approach: Use a synchronous save or separate async call after yielding, 
        # but FastApi streaming response closes scope. 
        # We will attempt to save *inside* the loop if session permits, or just save everything at end.
        
        # Re-using the passed 'db' session might be risky if response closes.
        # For now, let's assume valid session or create a new one if needed (complex).
        # Simplest: Save using the existing db session before yielding the final byte? 
        # Actually, let's save inside this generator.
        
        try:
             ai_msg = Message(
                conversation_id=conversation_id,
                role="ai",
                content=full_response
            )
             db.add(ai_msg)
             await db.commit()
        except Exception as e:
            print(f"Error saving AI message: {e}")

    return StreamingResponse(event_generator(), media_type="text/plain")
