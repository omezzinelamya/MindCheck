import pandas as pd
import numpy as np
import pickle
import joblib
from sklearn.preprocessing import LabelEncoder, MinMaxScaler
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import AdaBoostClassifier
from sklearn import metrics
from sklearn.preprocessing import binarize

# 1. Fonction de nettoyage + préparation avec sauvegarde des encodeurs et scaler
def clean_and_prepare(filepath):
    df = pd.read_csv(filepath)
    
    # Supposons que tu as déjà la fonction simplify_gender ici ou importée
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

    # Nettoyage initial
    df = df.drop(['comments', 'state', 'Timestamp'], axis=1)
    df['Gender'] = df['Gender'].apply(simplify_gender)
    df = df[~df['Gender'].isin(['a little about you', 'p'])]
    df['Age'] = pd.to_numeric(df['Age'], errors='coerce')
    df['Age'] = df['Age'].fillna(df['Age'].median())
    df['Age'] = df['Age'].clip(lower=18, upper=120)
    df['self_employed'] = df['self_employed'].replace('Unknown', 'No')
    df = df.drop('Country', axis=1)
    
    # Remplissage des NaN dans colonnes catégoriques avec 'Unknown'
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].fillna('Unknown')

    # Création des encodeurs
    encoders = {}
    for col in df.select_dtypes(include='object').columns:
        le = LabelEncoder()
        df[col] = le.fit_transform(df[col])
        encoders[col] = le

    # Normalisation Age
    scaler = MinMaxScaler()
    df['Age'] = scaler.fit_transform(df[['Age']])
    
    return df, encoders, scaler

# 2. Charger et préparer les données
df, encoders, scaler = clean_and_prepare("Data/survey.csv")

# 3. Sélection des features
feature_cols = ['Age', 'Gender', 'family_history', 'benefits', 'care_options', 'anonymity', 'leave', 'work_interfere']
X = df[feature_cols]
y = df['treatment']

# 4. Split train/test
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.30, random_state=0)

# 5. Entraînement AdaBoost
clf = DecisionTreeClassifier(criterion='entropy', max_depth=1)
model = AdaBoostClassifier(estimator=clf, n_estimators=500, random_state=42)
model.fit(X_train, y_train)

# 6. Évaluation simple (tu peux réutiliser ta fonction evalClassModel si tu veux)

y_pred_class = model.predict(X_test)
accuracy = metrics.accuracy_score(y_test, y_pred_class)
print(f"Accuracy AdaBoost: {accuracy:.4f}")

# 7. Sauvegarder modèle, encodeurs et scaler
joblib.dump(model, 'boosting_model.pkl')

with open('label_encoders.pkl', 'wb') as f:
    pickle.dump(encoders, f)

with open('scaler.pkl', 'wb') as f:
    pickle.dump(scaler, f)

print("Modèle, encodeurs et scaler sauvegardés !")
