# analyzer/sentiment_analyzer.py

from nltk.sentiment.vader import SentimentIntensityAnalyzer

def analyze_headlines_sentiment(headlines):
    analyzer = SentimentIntensityAnalyzer()
    analyzed = []

    for headline in headlines:
        scores = analyzer.polarity_scores(headline)
        sentiment = (
            "Positive" if scores['compound'] > 0.05 else
            "Negative" if scores['compound'] < -0.05 else
            "Neutral"
        )
        analyzed.append({
            "headline": headline,
            "sentiment": sentiment,
            "score": scores['compound']
        })

    return analyzed
