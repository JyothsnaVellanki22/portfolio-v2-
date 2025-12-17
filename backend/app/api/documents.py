from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.db.models import User, Document
from app.api.deps import get_current_user
from app.services.rag import rag_service

router = APIRouter()

@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if file.content_type != "text/plain":
         raise HTTPException(status_code=400, detail="Only text files are supported for now")
    
    content = (await file.read()).decode("utf-8")
    
    # Save metadata to DB
    doc = Document(filename=file.filename)
    db.add(doc)
    await db.commit()
    
    # Ingest into Vector DB
    await rag_service.ingest_file(content, file.filename)
    
    return {"message": f"Successfully processed {file.filename}"}
