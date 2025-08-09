from sqlalchemy import Column, Integer, String, DateTime, create_engine, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker , relationship
from datetime import datetime
import uuid 
# cấu hình cơ sở dữ liệu sqlite
engine = create_engine('sqlite:///./customer_churn_prediction.db', connect_args={"check_same_thread": False})
Base = declarative_base()

# tạo các model cho database
# bảng users
class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String) 
    # Quan hệ 1-n với CustomerData
    customer_data = relationship("CustomerData", back_populates="creator")
    # Quan hệ 1-n với Token
    tokens = relationship("Token", back_populates="user")

# bảng customerdata
class CustomerData(Base):
    __tablename__ = "customerdata"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    gender = Column(Integer, nullable=False)
    seniorCitizen = Column(Integer, nullable=False)
    partner = Column(Integer, nullable=False)
    dependents = Column(Integer, nullable=False)
    tenure = Column(Integer, nullable=False)
    phoneService = Column(Integer, nullable=False)
    multipleLines = Column(Integer, nullable=False)
    internetService = Column(String, nullable=False)
    onlineSecurity = Column(Integer, nullable=False)
    onlineBackup = Column(Integer, nullable=False)
    deviceProtection = Column(Integer, nullable=False)
    techSupport = Column(Integer, nullable=False)
    streamingTV = Column(Integer, nullable=False)
    streamingMovies = Column(Integer, nullable=False)
    contract = Column(String, nullable=False)
    paperlessBilling = Column(Integer, nullable=False)
    paymentMethod = Column(String, nullable=False)
    monthlyCharges = Column(Float, nullable=False)  
    totalCharges = Column(Float, nullable=False)     
    churn = Column(Boolean, nullable=True)           
    created_by = Column(String, ForeignKey("users.id"))
    creator = relationship("User", back_populates="customer_data")
# bảng token
class Token(Base):
    __tablename__ = "token"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4())) # Sửa từ nullale thành nullable
    token = Column(String, nullable=False)
    created_by = Column(String, ForeignKey("users.id"))
     # Quan hệ ngược lại
    user = relationship("User", back_populates="tokens")

class Models(Base):
    __tablename__ = "models"
    id = Column(String, primary_key=True, index=True, default=lambda: str(uuid.uuid4()))  # Sửa từ nullale thành nullable
    model_name = Column(String, nullable=False)
    description = Column(String)
    file_path = Column(String, nullable=False)

Base.metadata.create_all(engine)

# tạo session local
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
 

def get_db():
    db = SessionLocal()  # Sửa từ dp thành db cho rõ ràng
    try:
        yield db 
    finally:
        db.close()