import spacy
from sklearn.decomposition import LatentDirichletAllocation
from sklearn.feature_extraction.text import CountVectorizer

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# Sample crime categories
crime_keywords = {
    "phishing": ["email", "OTP", "bank details"],
    "hacking": ["hacked", "unauthorized access"],
    "identity theft": ["stolen identity", "fake profile"]
}

def detect_crime_type(complaint_text):
    doc = nlp(complaint_text)
    for category, keywords in crime_keywords.items():
        if any(keyword in doc.text.lower() for keyword in keywords):
            return category
    return "Unknown"

def apply_lda(complaints):
    vectorizer = CountVectorizer()
    X = vectorizer.fit_transform(complaints)

    lda = LatentDirichletAllocation(n_components=2, random_state=42)
    lda.fit(X)

    words = vectorizer.get_feature_names_out()
    topics = {idx: [words[i] for i in topic.argsort()[:-5 - 1:-1]] for idx, topic in enumerate(lda.components_)}
    return topics
from sklearn.metrics.pairwise import cosine_similarity

past_complaints = ["My credit card was hacked", "I was blackmailed online", "Received a phishing email"]
solutions = ["Contact your bank", "Report to police", "Don't click suspicious links"]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(past_complaints)

def find_similar_case(complaint_text):
    new_X = vectorizer.transform([complaint_text])
    similarities = cosine_similarity(new_X, X)
    best_match_idx = similarities.argmax()
    return past_complaints[best_match_idx], solutions[best_match_idx]
