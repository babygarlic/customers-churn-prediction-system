import os
import joblib
import pandas as pd

#  chịu trách nhiệm tiền xử lý dữ liệu mới
def preprocess_new_data(df_test, encoded_columns):
    # Chuyển đổi TotalCharges
    df_test['TotalCharges'] = pd.to_numeric(df_test['TotalCharges'], errors='coerce')
    # Xử lý NaN
    df_test.fillna(0, inplace=True)
    # Mã hóa biến phân loại
    df_test_encoded = pd.get_dummies(df_test, drop_first=True)
    # Đảm bảo cùng cột với dữ liệu huấn luyện
    df_test_encoded = df_test_encoded.reindex(columns=encoded_columns, fill_value=0)
    print (df_test_encoded.info())
    return df_test_encoded


# function xử lý dự đoán
def predict_one_sample(sample,model_path):# truyền vào model name cần điều chỉnh lại dữ liệu đầu vào của hàm
    # khai báo danh sách các biến theo thứ tự khi đưa vào mô hình
    expected_cols = [
        'SeniorCitizen', 'tenure', 'MonthlyCharges', 'TotalCharges',
        'gender_Male', 'Partner_Yes', 'Dependents_Yes', 'PhoneService_Yes',
        'MultipleLines_No phone service', 'MultipleLines_Yes',
        'InternetService_Fiber optic', 'InternetService_No',
        'OnlineSecurity_No internet service', 'OnlineSecurity_Yes',
        'OnlineBackup_No internet service', 'OnlineBackup_Yes',
        'DeviceProtection_No internet service', 'DeviceProtection_Yes',
        'TechSupport_No internet service', 'TechSupport_Yes',
        'StreamingTV_No internet service', 'StreamingTV_Yes',
        'StreamingMovies_No internet service', 'StreamingMovies_Yes',
        'Contract_One year', 'Contract_Two year', 'PaperlessBilling_Yes',
        'PaymentMethod_Credit card (automatic)', 'PaymentMethod_Electronic check',
        'PaymentMethod_Mailed check'
    ]
    # Tạo DataFrame từ mẫu dữ liệu
    # Convert Pydantic model sang dict
    if hasattr(sample, 'model_dump'):  # Pydantic v2
        sample_dict = sample.model_dump()
    elif hasattr(sample, 'dict'):  # Pydantic v1
        sample_dict = sample.dict()
    else:
        sample_dict = sample  # Nếu đã là dict
    # endcode dữ liệu 
    df_test = pd.DataFrame([sample_dict])
    sample_endcoded  = preprocess_new_data(df_test,expected_cols)

    # Tải mô hình và scaler
    
    modelpath = os.path.join(os.path.dirname(__file__), "AI_models", f"{model_path}")
    scalerpath = os.path.join(os.path.dirname(__file__), "AI_models", "scaler.pkl")
    
    model = joblib.load(modelpath)
    scaler = joblib.load(scalerpath)
    if model and scaler:
        print("Tải mô hình và scaler thành công.")
    
    # dự đoán
    sample_scaled = scaler.transform(sample_endcoded)
    model_pred = bool(model.predict(sample_scaled)[0])
    model_proba = model.predict_proba(sample_scaled)[0][1]
    print(f"Prediction: {model_pred}, Probability: {model_proba}")
    return {"Prediction": model_pred, "Probability": model_proba } # -> trả về tỉ lệ người dùng rời bỏ dịch vụ 

def predict_multiple_sample():
    pass
    return{}
