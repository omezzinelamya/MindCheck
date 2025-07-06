import nltk
nltk.download('punkt')
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
import json
import random

from keras.models import load_model

import spacy
nlp = spacy.load("en_core_web_sm")

# Load model and data
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(BASE_DIR, 'model.h5')
model = load_model(model_path)
intents = json.loads(open(os.path.join(BASE_DIR, 'intents.json')).read())
words = pickle.load(open(os.path.join(BASE_DIR, 'texts.pkl'), 'rb'))
classes = pickle.load(open(os.path.join(BASE_DIR, 'labels.pkl'), 'rb'))




# Preprocessing functions
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
                if show_details:
                    print(f"found in bag: {w}")
    return np.array(bag)

def predict_class(sentence, model):
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    if ints:
        tag = ints[0]['intent']
        for i in intents_json['intents']:
            if i['tag'] == tag:
                return random.choice(i['responses'])
    return "Sorry, I didn't understand that."

# Chatbot function (English only)
def chatbot_response(msg):
    # Directly process input message as English
    response_en = getResponse(predict_class(msg, model), intents)
    return response_en
