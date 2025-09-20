from fastapi import APIRouter, Request, Response, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm,HTTPBasic, HTTPBasicCredentials
from pydantic import BaseModel  
from sqlalchemy.orm import Session
from src.database.models import get_db 
from datetime import timedelta
from src.auth import get_current_user
import os
from dotenv import load_dotenv
from src.database.db import (
    get_user_email,
    create_user,
    User             
                         )
from ..auth import( 
    get_password_hash,
    verify_password,
    create_access_token)

load_dotenv()
try:
    ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES")
except:
    print("khong lay duoc evn!")

# create router
router = APIRouter()
security = HTTPBasic()
# khỏi tạo các schema 
class UserCreate(BaseModel):
    username:str
    email: str
    password: str

class UserOut(BaseModel):
    username:str

class Token(BaseModel):
    access_token: str
    token_type: str
# OAuth2 scheme
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

@router.post("/register")
async def register(user:UserCreate,db: Session= Depends(get_db)):
    """API đăng kí tài khoản"""
    print(user)
    checkuser = get_user_email(db,user.username) # kiểm tra xem thông tin email đã có hay chưa
    if checkuser:
        raise HTTPException(status_code= 400, detail="Username already registered")
    hashed_password = get_password_hash(user.password)
    user_reated = create_user(db, user.username,user.email, hashed_password)
    return {"username":user_reated.username}

@router.post("/login")
async def login(form_data:OAuth2PasswordRequestForm = Depends(), db: Session= Depends(get_db) ):
    """API lấy token"""
    print(form_data.username)
    user = get_user(db, form_data.username)
    if not user or verify_password(form_data.password,user.hashed_password) ==False:
        raise HTTPException(
            status_code= status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    else:
        access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRE_MINUTES))
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
    return {
                "access_token": access_token,
                "token_type": "bearer",
                "username": user.username
            }


@router.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_user)):
    """Lấy thông tin user hiện tại"""
    return {"username": current_user.username}