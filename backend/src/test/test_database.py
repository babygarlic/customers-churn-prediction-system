from src.database.db import add_model
from src.database.models import Models, get_db
from fastapi import Depends
from sqlalchemy.orm import Session
db: Session = Depends(get_db)
model1 = add_model(modelname="Logistic Regression",description="Mô hình được huấn luyện bằng thuật toán logistic regression cho độ chính xác 85%",path="D:\Project\customers_churn_system\backend\src\AI_models\logistic_model.pkl")
model1 = add_model(modelname="Random Forest",description="Mô hình được được huấn luyện bằng thuật toán random forest cho dộ chính xác 65%",path="D:\Project\customers_churn_system\backend\src\AI_models\random_forest_model.pkl")
model1 = add_model(modelname="Scaler",description="Mô hình được dùng để chuẩn hóa các dũ liệu đầu vào trước khi đưa vào mô hình dự đoán",path="D:\Project\customers_churn_system\backend\src\AI_models\scaler.pkl")