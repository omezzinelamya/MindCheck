# preprocess.py

import pandas as pd
import numpy as np
from sklearn.preprocessing import LabelEncoder, MinMaxScaler

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

def clean_mental_health_data(filepath):
    df = pd.read_csv(filepath)

    # Drop irrelevant columns
    df = df.drop(['comments', 'state', 'Timestamp'], axis=1)

    # Define features
    default_string = 'Unknown'
    default_int = 0
    int_features = ['Age']
    string_features = ['Gender', 'Country', 'self_employed', 'family_history', 'treatment', 'work_interfere',
                       'no_employees', 'remote_work', 'tech_company', 'anonymity', 'leave', 'mental_health_consequence',
                       'phys_health_consequence', 'coworkers', 'supervisor', 'mental_health_interview',
                       'phys_health_interview', 'mental_vs_physical', 'obs_consequence', 'benefits', 'care_options',
                       'wellness_program', 'seek_help']

    # Fill missing values
    for col in df.columns:
        if col in int_features:
            df[col] = df[col].fillna(default_int)
        elif col in string_features:
            df[col] = df[col].fillna(default_string)

    # Clean gender
    df['Gender'] = df['Gender'].apply(simplify_gender)
    df = df[~df['Gender'].isin(['a little about you', 'p'])]

    # Clean Age
    df['Age'] = pd.to_numeric(df['Age'], errors='coerce')
    df['Age'] = df['Age'].fillna(df['Age'].median())
    df['Age'] = df['Age'].clip(lower=18, upper=120)

    # Add age ranges for visualization
    df['age_range'] = pd.cut(df['Age'], [0, 20, 30, 65, 100], labels=["0-20", "21-30", "31-65", "66-100"], include_lowest=True)

    # Simplify self_employed
    df['self_employed'] = df['self_employed'].replace('Unknown', 'No')

    # Encode categorical variables
    label_dict = {}
    for col in df.select_dtypes(include='object').columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        label_dict['label_' + col] = list(le.classes_)

    # Drop country if not needed
    df = df.drop('Country', axis=1)

    # Normalize Age
    scaler = MinMaxScaler()
    df['Age'] = scaler.fit_transform(df[['Age']])
    return df, label_dict
