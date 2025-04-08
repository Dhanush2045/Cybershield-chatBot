import joblib
import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Define the target directory
save_dir = r"C:\Users\KAVIN\Downloads\Cyberthon_Backend (2)\Cyberthon_Backend\backend"
os.makedirs(save_dir, exist_ok=True)  # Ensure the directory exists

# Load dataset
try:
    df = pd.read_csv("C:\Users\KAVIN\Downloads\Cyberthon_Backend (2)\Cyberthon_Backend\backend\cybercrime_dataset.csv")
    print("✅ Dataset loaded successfully!")
except FileNotFoundError:
    print("❌ Error: cybercrime_dataset.csv not found! Ensure it's in the same directory.")
    exit()

# Encode crime categories
label_encoder = LabelEncoder()
df["Category"] = label_encoder.fit_transform(df["Category"])

# Define full save path
label_encoder_path = os.path.join(save_dir, "label_encoder.pkl")

# Save Label Encoder with error handling
try:
    joblib.dump(label_encoder, label_encoder_path)
    print(f"✅ Label Encoder saved successfully at: {label_encoder_path}")
except Exception as e:
    print(f"❌ Error saving label_encoder.pkl: {e}")
