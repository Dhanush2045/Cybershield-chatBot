import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB

# Sample dataset
data = {
    "complaint": [
        "I received a phishing email asking for my OTP.",
        "My Facebook account was hacked.",
        "Someone stole my wallet.",
        "My credit card details were leaked online."
    ],
    "label": [1, 1, 0, 1]  # 1 = Cybercrime, 0 = Not Cybercrime
}

df = pd.DataFrame(data)

# Convert text into TF-IDF features
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["complaint"])
y = df["label"]

# Train Naïve Bayes classifier
model = MultinomialNB()
model.fit(X, y)

# Save the model
joblib.dump(model, "cybercrime_classifier.pkl")
joblib.dump(vectorizer, "tfidf_vectorizer.pkl")
print("Model trained and saved successfully!")
