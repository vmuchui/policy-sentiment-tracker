from fastapi import APIRouter
from utils.data_loader import load_sentiment_results

router = APIRouter(prefix="/api/sentiment", tags=["Sentiment"])

@router.get("/")
async def get_sentiment_data():
    return load_sentiment_results()
