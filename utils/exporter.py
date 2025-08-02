import csv
import os
from datetime import datetime

def save_analysis_to_csv(results, filename=None):
    # Create `exports/` folder if it doesn't exist
    os.makedirs("exports", exist_ok=True)

    if not filename:
        date_str = datetime.now().strftime("%Y-%m-%d")
        filename = f"exports/sentiment_analysis_{date_str}.csv"

    with open(filename, mode='w', newline='', encoding='utf-8') as file:
        writer = csv.writer(file)
        # Write header
        writer.writerow(["Headline", "Sentiment", "Score"])
        
        # Write data
        for item in results:
            writer.writerow([item["headline"], item["sentiment"], item["score"]])

    print(f"\n📁 Sentiment results saved to: {filename}")
