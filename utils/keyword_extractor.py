from rake_nltk import Rake
import nltk
from nltk.tokenize import sent_tokenize

# Make sure 'punkt' is available
nltk.download("punkt")

def extract_keywords_from_headlines(headlines):
    text = " ".join(headlines)

    # Initialize Rake
    rake = Rake()

    # ✅ Override the buggy default tokenizer
    rake.sentence_tokenizer = sent_tokenize  # << this tells Rake to use NLTK's working sentence tokenizer

    # Extract keywords
    rake.extract_keywords_from_text(text)
    return rake.get_ranked_phrases()[:10]
