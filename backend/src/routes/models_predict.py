from fastapi import APIRouter, Request, Response, HTTPException, Depends
from pydantic import BaseModel
from typing import Annotated
from sqlalchemy.orm import Session
from ..database.models import  get_db, User
from src.database.db import get_models, get_model, get_models_notpath
from src.auth import get_current_user
# khởi tạo router
router = APIRouter()
# Khỏi tạo các schema 
# tạo các endpoint

# fix lỗi lấy hêt thông tin model chỉ láy id model name và discription và accuracy bỏ đi các trường không cần thiết
@router.get("/get_models")
async def get_models_info(current_user: Annotated[User,Depends(get_current_user)],db: Session = Depends(get_db)):
    """Lấy các model cho người dùng chọn lựa để đưa ra dự đoán"""
    try:
        models = get_models_notpath(db)
        print(type(models))
        print (f"Models from DB: {models}")
        if models is None:
            return {"models": [], "message": "No models found"}
        return models  # Trả về object với key
    except Exception as e:
        print(e)

@router.get("/models")
async def get_all_model(current_user: Annotated[User,Depends(get_current_user)],db: Session = Depends(get_db)):
    models = get_models(db)
    print(f"Models from DB: {models}")
    
    if models is None:
        return {"models": [], "message": "No models found"}
    
    return {"models": models}  # Trả về object với key


@router.get("/model_id")
async def get_one_model(current_user: Annotated[User,Depends(get_current_user)], idmodel: str, db: Session = Depends(get_db)):
    """Lấy các model cho người dùng chọn lựa để đưa ra dự đoán"""
    try:
       model = get_model(db,idmodel)
       print(type(model))
    except Exception as e:
        print(e)
    return {"model":model}