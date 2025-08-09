from fastapi import APIRouter, Request, Response, HTTPException, Depends
from pydantic import BaseModel  
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/create")
async def create_token():
    """Cấp token cho người dùng sử dụng API"""
    pass
