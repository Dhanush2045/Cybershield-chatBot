import joblib
import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder

# Define the target directory
save_dir = r"C:\Users\sanja\OneDrive\Desktop\Cyberthon_Backend\backend"
os.makedirs(save_dir, exist_ok=True)  # Ensure the directory exists

# Load dataset
df = pd.read_csv("cybercrime_dataset.csv")

# Encode crime categories
label_encoder = LabelEncoder()
df["Category"] = label_encoder.fit_transform(df["Category"])

# Define full save path
label_encoder_path = os.path.join(save_dir, "label_encoder.pkl")

# Save Label Encoder
joblib.dump(label_encoder, label_encoder_path)

print(f"✅ Label Encoder saved at: {label_encoder_path}")

