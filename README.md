# 🎯 API Dự đoán Khách hàng Rời bỏ (Customer Churn Prediction API)  

Hệ thống API dựa trên Machine Learning, cho phép dự đoán khả năng khách hàng rời bỏ dịch vụ với các mô hình được huấn luyện trên tập dữ liệu **Telco Customer Churn** .  
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![Accuracy](https://img.shields.io/badge/accuracy-85%25+-brightgreen.svg)

---

## 📄 Bộ dữ liệu và Notebook
- **Nguồn dữ liệu:** [Telco Customer Churn](https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data )
- **Huấn luyện mô hình:** [ColabNotebook](https://colab.research.google.com/drive/1HRXHu01HWl1WT5y3LB2HAuTnclC3eKVT?usp=sharing)
---

## ✨ Tính năng nổi bật  

### 🤖 Bộ máy Machine Learning  
- **Chiến lược kết hợp 2 mô hình:** Logistic Regression (độ chính xác ~85%) + Random Forest (~78%).  
- **Dự đoán theo thời gian thực:** Hỗ trợ dự đoán cho **1 khách hàng** hoặc **xử lý hàng loạt**.  
- **Xử lý dữ liệu tự động:** Tiền xử lý dữ liệu với **Pandas** & **NumPy**.  
- **Đánh giá hiệu suất:** Cung cấp đầy đủ các chỉ số đánh giá mô hình (Accuracy, Precision, Recall, F1-score).  

### 🔒 Bảo mật & Xác thực  
- **JWT Authentication:** Bảo mật truy cập API bằng token.  
- **Quản lý người dùng:** Đăng ký, đăng nhập, quản lý phiên làm việc.  
- **Bảo vệ endpoint:** Chỉ người dùng đã xác thực mới được phép gọi API dự đoán.  

### 📊 Quản lý dữ liệu  
- **Cơ sở dữ liệu SQLite:** Lưu trữ thông tin khách hàng, kết quả dự đoán và báo cáo.  
- **Theo dõi lịch sử:** Lưu lịch sử dự đoán và phân tích xu hướng rời bỏ.  
---



