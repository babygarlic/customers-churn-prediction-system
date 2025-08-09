from fastapi import Depends, HTTPException, status
from passlib.context import CryptContext
from jose import JWTError,jwt
from datetime import datetime, timedelta
from typing import Optional
from dotenv import load_dotenv
import os
from .database.models import get_db
from .database.db import get_user
from sqlalchemy.orm import Session

load_dotenv()

try:
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM")
except TypeError as e:
    print(e)

# Khởi tạo password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


#  xác thực mật khẩu 
def verify_password(plain_password:str, hashed_password:str):
    return pwd_context.verify(secret=plain_password,hash=hashed_password)

# mã hóa mật khẩu
def get_password_hash(password: str):
    return pwd_context.hash(password)

#tạo token đăng nhập
def create_access_token(data:dict, expires_delta: Optional[timedelta]=None):
    to_endcode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() +expires_delta
    else:
        expire = datetime.utcnow() +timedelta(minutes=15)
    to_endcode.update({"exp":expire})
    encoded_jwt = jwt.encode(to_endcode,SECRET_KEY, algorithm=ALGORITHM) 
    return encoded_jwt

# lấy người dùng hiện tại
def get_current_user(token, db:Session=Depends(get_db)):
    #tạo biến lưu trữ lỗi đăng nhập
    credentials_exception = HTTPException(
        status_code= status.HTTP_401_UNAUTHORIZED,
        detail= "Could not vaildate credential",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user(db,username)
    if user is None:
        raise credentials_exception
    return user
    