from fastapi import APIRouter, Request, Response, HTTPException, Depends
from pydantic import BaseModel  
from sqlalchemy.orm import Session
from src.database.models import  get_db
from src.database.db import get_models, get_model
# khởi tạo router
router = APIRouter()
# Khỏi tạo các schema 
class customerdata(BaseModel):
    pass
# tạo các endpoint
@router.get("/models")
async def get_all_model(db: Session = Depends(get_db)):
    models = get_models(db)
    print(type(models))
    print(f"Models from DB: {models}")  # Debug log tốt hơn
    
    if models is None:
        return {"models": [], "message": "No models found"}
    
    return {"models": models}  # Trả về object với key rõ ràng


@router.get("/model_id")
async def get_one_model( idmodel: str, db: Session = Depends(get_db)):
    """Lấy các model cho người dùng chọn lựa để đưa ra dự đoán"""
    try:
       model = get_model(db,idmodel)
       print(type(model))
    except Exception as e:
        print(e)
    return {"model":model}