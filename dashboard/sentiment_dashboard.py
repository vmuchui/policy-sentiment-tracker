import matplotlib.pyplot as plt
from collections import Counter

def visualize_sentiment_distribution(sentiment_results):
    sentiments = [item["sentiment"] for item in sentiment_results]
    sentiment_counts = Counter(sentiments)

    labels = sentiment_counts.keys()
    values = sentiment_counts.values()
    colors = ['green', 'red', 'grey']  # Positive, Negative, Neutral

    plt.figure(figsize=(8, 6))
    plt.pie(values, labels=labels, autopct='%1.1f%%', colors=colors, startangle=140)
    plt.title("Sentiment Distribution of Headlines")
    plt.axis("equal")
    plt.tight_layout()
    plt.show()
