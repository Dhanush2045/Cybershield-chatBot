from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from pymongo import MongoClient
from datetime import datetime, timedelta, timezone
import jwt
import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

# ----------------- Configuration -----------------
app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
bcrypt = Bcrypt(app)

solutions_map = {
    "Phishing": "Report to your bank immediately, change your passwords, and enable two-factor authentication.",
    "Hacking": "Disconnect the affected device from the internet, update passwords, and report to authorities.",
    "Identity theft": "Contact your bank and credit bureaus to freeze your accounts and report the theft.",
    "Fraud": "Block the offender, report the incident to the platform, and seek legal assistance if needed."
}

# Secret Key for JWT
app.config['SECRET_KEY'] = 'your-secret-key'  
TOKEN_EXPIRATION_DAYS = 7

# MongoDB Configuration
#password: J9WnhU1gcTH9PQdg
# MongoDB Setup
MONGO_URI = "mongodb+srv://mkavin62kavin:J9WnhU1gcTH9PQdg@cluster0.skikz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client['cybercrime_platform']
users_collection = db['users']
complaints_collection = db['complaints']
users_collection.create_index([("email", 1)], unique=True)

# Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATASET_PATH = os.path.join(BASE_DIR, "cybercrime_dataset.csv")
MODEL_PATH = os.path.join(BASE_DIR, "cybercrime_classifier.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "label_encoder.pkl")

# ----------------- Load or Train Model -----------------
try:
    if not os.path.exists(MODEL_PATH) or not os.path.exists(ENCODER_PATH):
        raise FileNotFoundError("Model or Label Encoder not found. Training a new one...")

    model = joblib.load(MODEL_PATH)
    label_encoder = joblib.load(ENCODER_PATH)
    print("✅ Model & Label Encoder Loaded Successfully!")
except FileNotFoundError:
    print("🚀 Training a new model...")

    # Load dataset
    df = pd.read_csv(DATASET_PATH)

    # Encode categories
    label_encoder = LabelEncoder()
    df["Category"] = label_encoder.fit_transform(df["Category"])

    # Train-Test Split
    X_train, X_test, y_train, y_test = train_test_split(df["Complaint"], df["Category"], test_size=0.2, random_state=42)

    # Train Model
    model = make_pipeline(TfidfVectorizer(), LogisticRegression())
    model.fit(X_train, y_train)

    # Save model and encoder
    joblib.dump(model, MODEL_PATH)
    joblib.dump(label_encoder, ENCODER_PATH)
    print("✅ Model trained and saved successfully!")

# ----------------- Helper Functions -----------------

def create_jwt_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.now(timezone.utc) + timedelta(days=TOKEN_EXPIRATION_DAYS)
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm="HS256")
    return token

def decode_jwt_token(token):
    try:
        payload = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

# ----------------- Routes -----------------

# ✅ Register User
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not email or not password or not username:
        return jsonify({"error": "Username and Email and password are required"}), 400

    # Check if email already exists
    if users_collection.find_one({'email': email}):
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    user = {
        'username':username,
        'email': email,
        'password': hashed_password,
        'created_at': datetime.utcnow()
    }
    result = users_collection.insert_one(user)
    created_user = users_collection.find_one({'_id': result.inserted_id})
    created_user['_id'] = str(created_user['_id'])  # Convert ObjectId to string
    created_user.pop('password')  # Remove password from response
    token = create_jwt_token(str(user['_id']))
    response = make_response(jsonify({"user":created_user}))
    response.headers['Access-Control-Allow-Origin'] = "http://localhost:5173"  # ✅ Must match frontend
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.set_cookie(
        'token', token,
        httponly=True,
        secure=True,  # ✅ Change this if using HTTPS
        samesite="None",
        max_age=7 * 24 * 60 * 60
    )
    return response

# ✅ Login User
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    user = users_collection.find_one({'email': email})
    if not user or not bcrypt.check_password_hash(user['password'], password):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_jwt_token(str(user['_id']))

    response = make_response(jsonify({
        "user": {
            "_id": str(user['_id']),
            "username":user['username'],
            "email": user['email'],
            "created_at": user['created_at']
        }
    }))
    response.headers['Access-Control-Allow-Origin'] = "http://localhost:5173"  # ✅ Must match frontend
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.set_cookie(
        'token', token,
        httponly=True,
        secure=True,  # ✅ Change this if using HTTPS
        samesite="None",
        max_age=7 * 24 * 60 * 60
    )

    return response
    
# ✅ Logout User
@app.route('/logout', methods=['GET'])
def logout():
    response = make_response(jsonify({"message": "Logged out successfully"}))
    response.set_cookie(
        'token', '', 
        expires=0,  # Expire immediately
        max_age=0,  # Max age of 0 to force deletion
        samesite="None",  # Match original settings
        secure=True,  # Match original settings
        httponly=True,  # Match original settings
        path='/'  # Delete cookie from the root path
    )
    return response
# ✅ Predict Crime Type
@app.route('/validate_complaint', methods=['POST'])
def validate_complaint():
    token = request.cookies.get('token')
    user_id = decode_jwt_token(token)
    if not user_id:
        print(user_id)
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    complaint_text = data.get("complaint")

    if not complaint_text:
        return jsonify({"error": "Complaint text is required"}), 400

    # Predict crime type
    prediction = model.predict([complaint_text])[0]
    crime_type = label_encoder.inverse_transform([prediction])[0]
    solution = solutions_map.get(crime_type, "No solution available for this crime type.")
    # Save complaint to DB
    complaint = {
        'user_id': user_id,
        'complaint_text': complaint_text,
        'crime_type': crime_type,
        'solution': solution,
        'created_at': datetime.utcnow()
    }
    complaints_collection.insert_one(complaint)

    return jsonify({"crime_type": crime_type, "is_cybercrime": True,"solution" : solution})

# ✅ Get User Complaints
@app.route('/complaints', methods=['GET'])
def get_complaints():
    token = request.cookies.get('token')
    user_id = decode_jwt_token(token)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    complaints = list(complaints_collection.find({'user_id': user_id}))
    for complaint in complaints:
        complaint['_id'] = str(complaint['_id'])
        complaint['user_id'] = str(complaint['user_id'])

    return jsonify(complaints)
from bson import ObjectId

from flask import request, jsonify, make_response
from bson import ObjectId

@app.route('/check', methods=['GET'])
def check_auth():
    token = request.cookies.get('token')  # Get the token from cookies
    print(f"Received Token: {token}")  # 🔍 Debugging: Print token

    if not token:
        print("❌ No token found in cookies")  # 🔍 Debugging
        return jsonify({"message": "Unauthorized"}), 401

    user_id = decode_jwt_token(token)
    print(f"Decoded User ID: {user_id}")  # 🔍 Debugging: Print user ID

    if not user_id:
        print("❌ Token is invalid or expired")  # 🔍 Debugging
        return jsonify({"message": "Unauthorized"}), 401

    user = users_collection.find_one({'_id': ObjectId(user_id)})
    if not user:
        print("❌ User not found in database")  # 🔍 Debugging
        return jsonify({"message": "Unauthorized"}), 401

    response = make_response(jsonify({
        "user": {
            "_id": str(user['_id']),
            "email": user['email'],
            "created_at": user['created_at']
        }
    }))

    # ✅ Add necessary headers to avoid CORS issues
    response.headers['Access-Control-Allow-Origin'] = "http://localhost:5173"
    response.headers['Access-Control-Allow-Credentials'] = 'true'

    print("✅ User authenticated successfully")  # 🔍 Debugging
    return response, 200


# ✅ Train with New Data
@app.route('/train_new_data', methods=['POST'])
def train_new_data():
    token = request.cookies.get('token')
    user_id = decode_jwt_token(token)
    if not user_id:
        return jsonify({"error": "Unauthorized"}), 401

    data = request.json
    df_new = pd.DataFrame(data)
    df_existing = pd.read_csv(DATASET_PATH)
    df_updated = pd.concat([df_existing, df_new], ignore_index=True)
    df_updated.to_csv(DATASET_PATH, index=False)

    label_encoder.fit(df_updated["Category"])
    df_updated["Category"] = label_encoder.transform(df_updated["Category"])
    model.fit(df_updated["Complaint"], df_updated["Category"])

    joblib.dump(model, MODEL_PATH)
    joblib.dump(label_encoder, ENCODER_PATH)

    return jsonify({"message": "Model retrained successfully!"})

# ✅ Start Flask App
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000, debug=True)