from fastapi import APIRouter, Request, Response, HTTPException, Depends
from pydantic import BaseModel  
from sqlalchemy.orm import Session

# khởi tạo router
router = APIRouter()
# Khỏi tạo các schema 
class customerdata(BaseModel):
    pass
# tạo các endpoint
@router.get("/models")
async def get_models():
    """Lấy các model cho người dùng chọn lựa để đưa ra dự đoán"""
    pass