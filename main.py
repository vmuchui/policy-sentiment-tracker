import json
import logging
from apscheduler.schedulers.blocking import BlockingScheduler
import os


from scraper.news_headline_scraper import fetch_all_headlines
from utils.keyword_extractor import extract_keywords_from_headlines
from analyzer.sentiment_analyzer import analyze_headlines_sentiment
from dashboard.sentiment_dashboard import visualize_sentiment_distribution
from utils.exporter import save_analysis_to_csv

os.environ["NLTK_DATA"] = "/home/runner/nltk_data"

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")


def run_pipeline():
    logging.info("🔁 Starting policy sentiment analysis pipeline...")

    # Fetch news headlines
    headlines = fetch_all_headlines()
    logging.info(f"Fetched {len(headlines)} headlines.")

    # Extract trending keywords
    keywords = extract_keywords_from_headlines(headlines)
    logging.info(f"Extracted {len(keywords)} keywords.")

    # Analyze sentiment
    results = analyze_headlines_sentiment(headlines)
    logging.info(f"Analyzed sentiment for {len(results)} headlines.")

    # Export to CSV
    save_analysis_to_csv(results)

    # Save to backend JSON
    output_data = {
        "headlines": headlines,
        "keywords": keywords,
        "sentiments": results
    }

    with open("backend/results.json", "w", encoding="utf-8") as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    logging.info("✅ Analysis pipeline complete and results saved.")


if __name__ == "__main__":
    # Run once at startup
    run_pipeline()

    # Set up recurring job every 6 hours
    scheduler = BlockingScheduler()
    scheduler.add_job(run_pipeline, trigger="interval", hours=1)

    try:
        logging.info("📅 Scheduler started. Will run every 1 hour.")
        scheduler.start()
    except (KeyboardInterrupt, SystemExit):
        logging.info("🛑 Scheduler stopped.")
