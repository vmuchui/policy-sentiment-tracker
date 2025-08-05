from rake_nltk import Rake
import nltk
from nltk.tokenize import sent_tokenize

# Ensure punkt is downloaded and used correctly
nltk.download("punkt")

def extract_keywords_from_headlines(headlines):
    text = " ".join(headlines)

    rake = Rake()
    rake.sentence_tokenizer = sent_tokenize

    rake.extract_keywords_from_text(text)
    return rake.get_ranked_phrases()[:10]
