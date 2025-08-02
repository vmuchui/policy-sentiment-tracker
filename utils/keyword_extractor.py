import nltk
from rake_nltk import Rake

nltk.download('stopwords')  # Only needed once

def extract_keywords_from_headlines(headlines, max_keywords=10):
    text = ". ".join(headlines)  # Combine headlines into one string
    rake = Rake()  # Uses NLTK stopwords by default
    rake.extract_keywords_from_text(text)
    
    ranked_phrases = rake.get_ranked_phrases()
    
    # Return top N keywords/phrases
    return ranked_phrases[:max_keywords]


if __name__ == "__main__":
    # Example test
    sample = [
        "SRC yapinga Mswada wa kuongezea majaji marupurupu",
        "Raila na Ruto wakutana kuhusu uchaguzi wa 2027",
        "Wakenya kukaza kamba bei za bidhaa zikipanda",
        "Maraga aahidi kuzima ufisadi akipata urais"
    ]
    
    keywords = extract_keywords_from_headlines(sample)
    print("\nTop Extracted Keywords:")
    for kw in keywords:
        print(f"• {kw}")
