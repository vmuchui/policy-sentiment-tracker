import json
import os

def load_sentiment_results():
    file_path = os.path.join(os.path.dirname(__file__), "../results.json")
    file_path = os.path.abspath(file_path)

    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)
