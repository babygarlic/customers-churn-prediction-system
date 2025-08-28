export interface User {
  username: string;
  token_type: string;
  access_token: string;
}

export interface ChurnPredictionData {
  gender: string; // "Male" or "Female"
  SeniorCitizen: number; // 0 or 1
  Partner: string; // "Yes" or "No"
  Dependents: string; // "Yes" or "No"
  tenure: number; // Số tháng sử dụng
  PhoneService: string; // "Yes" or "No"
  MultipleLines: string; // "Yes", "No", "No phone service"
  InternetService: string; // "DSL", "Fiber optic", "No"
  OnlineSecurity: string; // "Yes", "No", "No internet service"
  OnlineBackup: string; // "Yes", "No", "No internet service"
  DeviceProtection: string; // "Yes", "No", "No internet service"
  TechSupport: string; // "Yes", "No", "No internet service"
  StreamingTV: string; // "Yes", "No", "No internet service"
  StreamingMovies: string; // "Yes", "No", "No internet service"
  Contract: string; // "Month-to-month", "One year", "Two year"
  PaperlessBilling: string; // "Yes" or "No"
  PaymentMethod: string; // "Electronic check", "Mailed check", "Bank transfer (automatic)", "Credit card (automatic)"
  MonthlyCharges: number; // Chi phí hàng tháng
  TotalCharges: string; // String format
  Created_by:string
}

export interface PredictionResult {
  Prediction: 'Yes' | 'No';
  Probability: number;
  RiskLevel: 'Low' | 'Medium' | 'High';
}

export interface ModelInfor{
  id: string;
  model_name: string;
  accuracy: number;
  description: string;
}