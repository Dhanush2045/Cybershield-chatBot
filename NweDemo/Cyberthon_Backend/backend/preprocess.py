import re
import spacy
import nltk
from nltk.corpus import stopwords

# Download stopwords if not already installed
nltk.download('stopwords')

# Load spaCy model for lemmatization
nlp = spacy.load("en_core_web_sm")

# Load stopwords
stop_words = set(stopwords.words("english"))
def clean_text(text):
    """
    Cleans and preprocesses complaint text.
    Steps:
    1. Lowercasing
    2. Removing special characters & punctuation
    3. Tokenization
    4. Removing stopwords
    5. Lemmatization
    """
    # Convert to lowercase
    text = text.lower()
    
    # Remove special characters & punctuation
    text = re.sub(r"[^a-zA-Z0-9\s]", "", text)

    # Tokenize words using spaCy
    doc = nlp(text)
    
    # Remove stopwords & lemmatize words
    clean_words = [token.lemma_ for token in doc if token.text not in stop_words]
    
    # Join words back to sentence
    return " ".join(clean_words)
if __name__ == "__main__":
    sample_text = "I received a Phishing email asking for my bank details!"
    clean_output = clean_text(sample_text)
    print("Before Preprocessing:", sample_text)
    print("After Preprocessing:", clean_output)
