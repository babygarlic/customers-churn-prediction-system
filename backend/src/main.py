from fastapi import FastAPI , HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from .routes import authentication, customer_churn_predict, token,models_predict

app = FastAPI()

app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:5173"],  # Adjust this to your frontend's URL in production
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"]
                   )
app.include_router(authentication.router, prefix="/auth")
app.include_router(customer_churn_predict.router, prefix="/customers-churn")
app.include_router(token.router, prefix='/token')
app.include_router(models_predict.router, prefix="/models")