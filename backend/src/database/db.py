from sqlalchemy.orm import Session
from datetime import timedelta
from .models import(
    User
)
# token
def create_acces_token():
    pass

#model


# users manage
def get_user(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

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