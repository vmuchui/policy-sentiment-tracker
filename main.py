from scraper.news_headline_scraper import fetch_all_headlines
from utils.keyword_extractor import extract_keywords_from_headlines
from analyzer.sentiment_analyzer import analyze_headlines_sentiment
from dashboard.sentiment_dashboard import visualize_sentiment_distribution
from utils.exporter import save_analysis_to_csv

if __name__ == "__main__":
    # Fetch news headlines
    headlines = fetch_all_headlines()
    print("\n📰 Latest Headlines:")
    for i, h in enumerate(headlines, 1):
        print(f"{i}. {h}")

    # Extract trending keywords
    keywords = extract_keywords_from_headlines(headlines)
    print("\n🔍 Extracted Trending Keywords:")
    for i, kw in enumerate(keywords, 1):
        print(f"{i}. {kw}")

    # Analyze sentiment
    print("\n🧠 Sentiment Analysis:")
    results = analyze_headlines_sentiment(headlines)
    for item in results:
        sentiment = item["sentiment"]
        score = item["score"]
        print(f"- ({sentiment}, Score={score}) {item['headline']}")

    print("\n--- Analysis Complete ---")

    # Visualize
    visualize_sentiment_distribution(results)

    # Export to CSV
    save_analysis_to_csv(results)

import json

output_data = {
    "headlines": headlines,
    "keywords": keywords,
    "sentiments": results
}

with open("frontdash/public/results.json", "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=2)
