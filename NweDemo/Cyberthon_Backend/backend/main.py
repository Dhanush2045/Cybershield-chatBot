from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# Define absolute paths
BASE_DIR = r"C:\Users\KAVIN\Downloads\Cyberthon_Backend (2)\Cyberthon_Backend\backend"
DATASET_PATH = os.path.join(BASE_DIR, "cybercrime_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "cybercrime_classifier.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

app = Flask(__name__)
CORS(app)

# ---------------------- 1️⃣ Load or Train Model ----------------------
try:
    if not os.path.exists(MODEL_PATH) or not os.path.exists(ENCODER_PATH):
        raise FileNotFoundError("Model or Label Encoder not found. Training a new one...")

    model = joblib.load(MODEL_PATH)
    label_encoder = joblib.load(ENCODER_PATH)
    print("✅ Model & Label Encoder Loaded Successfully!")

except FileNotFoundError as e:
    print(f"⚠️ {e}")

    # Ensure dataset exists before training
    if not os.path.exists(DATASET_PATH):
        print(f"❌ Dataset not found at: {DATASET_PATH}. Please provide 'cybercrime_dataset.csv'.")
        exit()

    print("🚀 Training a New Model...")

    # Load dataset
    df = pd.read_csv(DATASET_PATH)

    # Encode crime categories
    label_encoder = LabelEncoder()
    df["Category"] = label_encoder.fit_transform(df["Category"])

    # Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(df["Complaint"], df["Category"], test_size=0.2, random_state=42)

    # Train ML Model
    model = make_pipeline(TfidfVectorizer(), LogisticRegression())
    model.fit(X_train, y_train)

    # Save Model & Label Encoder
    joblib.dump(model, MODEL_PATH)
    joblib.dump(label_encoder, ENCODER_PATH)

    print("✅ Model Trained and Saved Successfully!")

# ---------------------- 2️⃣ Validate & Detect Cybercrime ----------------------
@app.route('/validate_complaint', methods=['POST'])
def validate_complaint():
    data = request.json
    complaint_text = data.get("complaint", "")

    if not complaint_text:
        return jsonify({"error": "Complaint text is missing!"}), 400

    # Predict crime category
    prediction = model.predict([complaint_text])[0]
    crime_type = label_encoder.inverse_transform([prediction])[0]

    return jsonify({"crime_type": crime_type, "is_cybercrime": True})

# ---------------------- 3️⃣ Train with New Data ----------------------
@app.route('/train_new_data', methods=['POST'])
def train_new_data():
    data = request.json  # Expecting a list of complaints and their labels

    if not data:
        return jsonify({"error": "No data provided!"}), 400

    df_new = pd.DataFrame(data)

    # Append to existing dataset
    df_existing = pd.read_csv(DATASET_PATH)
    df_updated = pd.concat([df_existing, df_new], ignore_index=True)

    # Save updated dataset
    df_updated.to_csv(DATASET_PATH, index=False)

    # Retrain Model
    label_encoder.fit(df_updated["Category"])
    df_updated["Category"] = label_encoder.transform(df_updated["Category"])

    model.fit(df_updated["Complaint"], df_updated["Category"])

    # Save Updated Model
    joblib.dump(model, MODEL_PATH)
    joblib.dump(label_encoder, ENCODER_PATH)

    return jsonify({"message": "Model retrained successfully!"})

# ---------------------- Run Flask Application ----------------------
if __name__ == "__main__":
    app.run(debug=True, port=5001)
