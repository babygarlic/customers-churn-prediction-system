from sqlalchemy.orm import Session
from sqlalchemy import select
from datetime import timedelta
from .models import(
    User,
    CustomerData,
    Models
)
# token
def create_acces_token():
    pass

#model
#thêm model
def add_model(modelname: str,description:str ,path:str, db: Session):
    model = Models(
    model_name = modelname,
    description = description,
    file_path =path
    )
    db.add(model)
    db.commit()
    db.refresh(model)
    return model

# lấy toàn bộ model 
def get_models(db:Session):     
    return db.query(Models).all()
# lấy toàn bộ model nhưng không lấy path
def get_models_notpath(db:Session):
    query = select(Models.id, Models.model_name, Models.description, Models.accuracy)
    result = db.execute(query).all()
    return [
            {
                "id": row[0],
                "model_name": row[1],
                "description": row[2],
                "accuracy": row[3]
            }
            for row in result
        ]

# lấy thông tin model dựa trên id
def get_model(db:Session, model_id: str):
    return db.query(Models).filter(Models.id==model_id).first()
# xóa model 
def remove_model(db:Session, model_id: str):
    pass

# users manage
def get_user_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

def get_user_name(db: Session, name: str):
    return db.query(User).filter(User.username == name).first()

def create_user(db: Session, username:str,email:str, password: str):
    user = User(
        username=username,
        email=email,
        hashed_password=password
        )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

#customer data
def create_customers_data(
        db: Session,
        customerData
        ):
     db.add(customerData)
     db.commit()
     db.refresh(customerData)
     return customerData

def get_customers_data(id:str, db:Session):
    return db.query(CustomerData).filter(CustomerData.id==id).first()

