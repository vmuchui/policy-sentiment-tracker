from scraper.news_headline_scraper import fetch_all_headlines
from utils.keyword_extractor import extract_keywords_from_headlines

if __name__ == "__main__":
    headlines = fetch_all_headlines()
    print("\n📰 Latest Headlines:")
    for i, h in enumerate(headlines, 1):
        print(f"{i}. {h}")

    keywords = extract_keywords_from_headlines(headlines)
    print("\n🔍 Extracted Trending Keywords:")
    for i, kw in enumerate(keywords, 1):
        print(f"{i}. {kw}")

from analyzer.sentiment_analyzer import analyze_headlines_sentiment
print("\n🧠 Sentiment Analysis:")

results = analyze_headlines_sentiment(headlines)

for item in results:
    sentiment = item["sentiment"]
    score = item["score"]
    print(f"- ({sentiment}, Score={score}) {item['headline']}")
    print("\n--- Analysis Complete ---")