from fastapi import APIRouter, Request, Response, HTTPException, Depends, Header

from typing import Annotated
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel , Field
from sqlalchemy.orm import Session
from src.database.models import get_db, CustomerData, User
from src.database.db import get_model , create_customers_data
from src.ai_prediction import predict_one_sample
from src.auth import get_current_user
# khởi tạo router
router = APIRouter()
security = HTTPBearer()
# Khỏi tạo các schema 
class CustomerInput(BaseModel):
    gender: str = Field(..., example="Male")  # "Male" or "Female"
    SeniorCitizen: int = Field(..., example=0)  # 0 or 1
    Partner: str = Field(..., example="Yes")  # "Yes" or "No"
    Dependents: str = Field(..., example="No")  # "Yes" or "No"
    tenure: int = Field(..., example=12)  # Số tháng sử dụng
    PhoneService: str = Field(..., example="Yes")  # "Yes" or "No"
    MultipleLines: str = Field(..., example="Yes")  # "Yes", "No", "No phone service"
    InternetService: str = Field(..., example="Fiber optic")  # "DSL", "Fiber optic", "No"
    OnlineSecurity: str = Field(..., example="Yes")  # "Yes", "No", "No internet service"
    OnlineBackup: str = Field(..., example="No")  # "Yes", "No", "No internet service"
    DeviceProtection: str = Field(..., example="Yes")  # "Yes", "No", "No internet service"
    TechSupport: str = Field(..., example="No")  # "Yes", "No", "No internet service"
    StreamingTV: str = Field(..., example="Yes")  # "Yes", "No", "No internet service"
    StreamingMovies: str = Field(..., example="No")  # "Yes", "No", "No internet service"
    Contract: str = Field(..., example="Month-to-month")  # "Month-to-month", "One year", "Two year"
    PaperlessBilling: str = Field(..., example="Yes")  # "Yes" or "No"
    PaymentMethod: str = Field(..., example="Electronic check")  # "Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"
    MonthlyCharges: float = Field(..., example=70.5)  # Chi phí hàng tháng
    TotalCharges: str = Field(..., example="850.0")  # String, sẽ convert sang float
    Created_by: str

# tạo các endpoint
@router.post("/predict-one") # kiểm tra form do người dùng gửi  -> dự đoán -> lưu vào cơ sở dữ liệu -> Trả kết quả cho người dùng :Tỉ lệ rời bỏ + Model dự đoán
async def predict_one(data: CustomerInput, model_id :str,current_user:Annotated[User, Depends(get_current_user)],db: Session = Depends(get_db)):
    """Dự đoán cho một sample"""
    # xử lý xác thực ngươi dùng 
    try:
    # xử lý dự đoán sau khi xác thực
        customer_data =data
        model = get_model(db,model_id)
        prediction = predict_one_sample(data, model.file_path,)
        # lưu dữ liệu vào database
        print(customer_data)
        customer = CustomerData(
                gender = customer_data.gender,
                seniorCitizen= customer_data.SeniorCitizen,
                partner=customer_data.Partner,
                dependents = customer_data.Dependents,
                tenure = customer_data.tenure,
                phoneService = customer_data.PhoneService,
                multipleLines = customer_data.MultipleLines,
                internetService = customer_data.InternetService,
                onlineSecurity = customer_data.OnlineSecurity,
                onlineBackup = customer_data.OnlineBackup,
                deviceProtection = customer_data.DeviceProtection,
                techSupport = customer_data.TechSupport,
                streamingTV = customer_data.StreamingTV,
                streamingMovies = customer_data.StreamingMovies,
                contract = customer_data.Contract,
                paperlessBilling = customer_data.PaperlessBilling,
                paymentMethod = customer_data.PaymentMethod,
                monthlyCharges = customer_data.MonthlyCharges,
                totalCharges = customer_data.TotalCharges,
                churn = prediction["Prediction"],
                created_by = current_user.id
            )
        customercreated = create_customers_data(db,customer)
        if customercreated:
            print("Lưu dữ liệu thành công!") # luue data vào cơ sở dữ liệu
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return  prediction

@router.post("/predict-multiple") # kiểm tra form do người dùng gửi  -> dự đoán -> lưu vào cơ sở dữ liệu -> Trả kết quả cho người dùng :Tỉ lệ rời bỏ + Model dự đoán
async def predict_mutiple():
    """Dự đoán cho nhiều sample"""
    pass
