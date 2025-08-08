from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.sentiment import router as sentiment_router

app = FastAPI(title="Policy Sentiment Tracker API")

# Allow frontend (Vite dev or hosted)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sentiment_router)
