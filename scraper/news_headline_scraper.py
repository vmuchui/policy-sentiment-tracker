import feedparser

def get_rss_headlines(rss_url, source_name):
    print(f"Fetching from: {source_name} - {rss_url}")
    feed = feedparser.parse(rss_url)

    if not feed.entries:
        print(f"⚠️ No entries found in {source_name} RSS feed!")
        return []

    return [entry.title for entry in feed.entries[:10]]


def fetch_all_headlines():
    sources = [
        ("https://www.capitalfm.co.ke/news/feed/", "Capital FM"),
        ("https://taifaleo.nation.co.ke/feed/", "Taifa Leo")
    ]

    all_headlines = []
    for url, name in sources:
        headlines = get_rss_headlines(url, name)
        all_headlines.extend(headlines)

    return all_headlines


if __name__ == "__main__":
    all_headlines = fetch_all_headlines()
    print("\n--- Latest Headlines from Kenyan News Sources (RSS) ---")
    for i, headline in enumerate(all_headlines, 1):
        print(f"{i}. {headline}")
    print("\n--- End of Headlines ---")
