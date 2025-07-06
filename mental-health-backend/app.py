from flask import Flask, request, jsonify
import joblib
import pickle
import pandas as pd
import numpy as np
from flask_cors import CORS
import logging
import os
import datetime
from scraper import get_related_fact_sheets  # Import your scraper function
app = Flask(__name__)
CORS(app)
from chatbot.chatbot import chatbot_response
# Load model, encoders, and scaler
model = joblib.load('boosting_model.pkl')

with open('label_encoders.pkl', 'rb') as f:
    encoders = pickle.load(f)

with open('scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)

# Simplify gender to consistent categories
def simplify_gender(g):
    g = str(g).strip().lower()
    male = ["male", "m", "male-ish", "maile", "mal", "male (cis)", "make", "male ", "man", "msle", "mail", "malr", "cis man", "cis male"]
    female = ["cis female", "f", "female", "woman", "femake", "female ", "cis-female/femme", "female (cis)", "femail"]
    trans = ["trans-female", "something kinda male?", "queer/she/they", "non-binary", "nah", "all", "enby", "fluid", "genderqueer",
             "androgyne", "agender", "male leaning androgynous", "guy (-ish) ^_^", "trans woman", "neuter", "female (trans)",
             "queer", "ostensibly male, unsure what that really means"]
    if g in male:
        return "male"
    elif g in female:
        return "female"
    elif g in trans:
        return "trans"
    else:
        return "other"

# Preprocess input for prediction
def preprocess_input(data):
    df = pd.DataFrame([data])

    # Simplify Gender
    df['Gender'] = df['Gender'].apply(simplify_gender)

    # Apply label encoding for categorical columns
    for col, le in encoders.items():
        if col in df.columns:
            vals = df[col].values
            new_vals = []
            for v in vals:
                if v in le.classes_:
                    new_vals.append(v)
                else:
                    if 'Unknown' in le.classes_:
                        new_vals.append('Unknown')
                    else:
                        new_vals.append(le.classes_[0])
            df[col] = le.transform(new_vals)

    # Scale Age
    df['Age'] = scaler.transform(df[['Age']])

    return df

@app.route('/')
def home():
    return "Server is running!"

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({'error': 'No input data provided'}), 400
    try:
        df_input = preprocess_input(data)
        # Use only features your model expects
        model_features = ['Age', 'Gender', 'family_history', 'benefits', 'care_options', 'anonymity', 'leave', 'work_interfere']
        df_input = df_input[model_features]

        prediction = model.predict(df_input)[0]
        prob = model.predict_proba(df_input)[0, 1]

        return jsonify({'prediction': int(prediction), 'probability': float(prob)})
    except Exception as e:
        logging.error("Prediction error", exc_info=True)
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload', methods=['POST'])
def upload_mental_health_data():
    try:
        data = request.json
        if not data:
            return jsonify({"message": "No data provided"}), 400

        # Expected fields for upload (exclude target 'treatment')
        EXPECTED_COLUMNS = [
            'Age', 'Gender', 'self_employed', 'family_history', 'work_interfere',
            'no_employees', 'remote_work', 'tech_company', 'anonymity', 'leave',
            'mental_health_consequence', 'phys_health_consequence', 'coworkers', 'supervisor',
            'mental_health_interview', 'phys_health_interview', 'mental_vs_physical',
            'obs_consequence', 'benefits', 'care_options', 'wellness_program', 'seek_help'
        ]

        missing_cols = [col for col in EXPECTED_COLUMNS if col not in data]
        if missing_cols:
            return jsonify({"message": f"Missing fields: {', '.join(missing_cols)}"}), 400

        # Validate age
        try:
            age = int(data['Age'])
            if age < 18 or age > 120:
                return jsonify({"message": "Age must be between 18 and 120"}), 400
        except ValueError:
            return jsonify({"message": "Invalid age format"}), 400

        # Add timestamp
        data['Timestamp'] = datetime.datetime.now().isoformat()

        # Prepare dataframe for cleaning and encoding
        df_cleaned = pd.DataFrame([data])

        # Simplify Gender
        df_cleaned['Gender'] = df_cleaned['Gender'].apply(simplify_gender)

        # Encode categorical columns
        for col, le in encoders.items():
            if col in df_cleaned.columns:
                vals = df_cleaned[col].values
                new_vals = []
                for v in vals:
                    if v in le.classes_:
                        new_vals.append(v)
                    else:
                        if 'Unknown' in le.classes_:
                            new_vals.append('Unknown')
                        else:
                            new_vals.append(le.classes_[0])
                df_cleaned[col] = le.transform(new_vals)

        # Scale Age
        df_cleaned['Age'] = scaler.transform(df_cleaned[['Age']])

        # Predict treatment label for saved data
        model_features = ['Age', 'Gender', 'family_history', 'benefits', 'care_options', 'anonymity', 'leave', 'work_interfere']
        df_for_pred = df_cleaned[model_features]
        predicted_label = model.predict(df_for_pred)[0]
        df_cleaned['predicted_treatment'] = predicted_label

        # Save to CSV (append mode)
        CLEANED_DATA_FILE = "Data/survey_cleaned.csv"
        write_header = not os.path.exists(CLEANED_DATA_FILE)
        df_cleaned.to_csv(CLEANED_DATA_FILE, mode='a', header=write_header, index=False)

        return jsonify({"message": "Cleaned data uploaded successfully"}), 200

    except Exception as e:
        logging.error("Error uploading mental health data", exc_info=True)
        return jsonify({"message": f"Error: {str(e)}"}), 500
@app.route('/api/related-fact-sheets')
def related_fact_sheets():
    data = get_related_fact_sheets()  # Call the scraper function
    return jsonify(data)
@app.route("/bot")
def get_bot_response():
    userText = request.args.get('msg')
    print(f"[get_bot_response] Message: {userText}")
    return chatbot_response(userText)

if __name__ == '__main__':
    app.run(debug=True)
