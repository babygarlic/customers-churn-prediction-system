from fastapi import APIRouter, Request, Response, HTTPException, Depends
from pydantic import BaseModel  
from sqlalchemy.orm import Session

# khởi tạo router
router = APIRouter()
# Khỏi tạo các schema 
class customerdata(BaseModel):
    pass
# tạo các endpoint

@router.post("/predict-one-sample")
async def predict_one_sample():
    """Dự đoán cho một sample"""
    pass

@router.post("/predict-multiple-sample")
async def predict_one_sample():
    """Dự đoán cho nhiều sample"""
    pass
