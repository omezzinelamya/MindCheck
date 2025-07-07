# MindCheck - Mental Health Prediction & Support App

Welcome to **MindCheck**, a web application designed to help users check in on their mental health and receive insights about their well-being. This project combines advanced machine learning, natural language processing, and web scraping techniques to provide a friendly and interactive user experience.

---

## Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Prediction Module](#prediction-module)  
- [Chatbot Module](#chatbot-module)  
- [Web Scraping Module](#web-scraping-module)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Usage](#usage)  
- [Contact](#contact)  

---

## Project Overview

MindCheck aims to provide users with an easy-to-use interface to self-assess their mental health status based on work and personal information. Additionally, users can interact with a chatbot for mental health support and stay updated with the latest mental health news from reputable sources.

---

## Features

- **Mental Health Prediction:** Using user inputs to predict mental health status with a boosting machine learning model.  
- **Chatbot Support:** An NLP-driven chatbot powered by a sequential deep learning model for interactive mental health assistance.  
- **Latest News Retrieval:** Automated web scraping to fetch the latest mental health news and fact sheets from the World Health Organization (WHO) website.  

---

## Prediction Module

The prediction module uses a **Gradient Boosting** model trained on mental health and employment data to estimate the probability that a user might need professional mental health support. 

- Inputs include demographic data, employment status, family mental health history, and workplace environment.  
- The model returns a prediction (Needs Treatment / No Treatment Needed) with a probability score.  
- Built with **Python** and **scikit-learn** .

---

## Chatbot Module
Our  mental health chatbot leverages Natural Language Processing (NLP) and a Sequential Deep Learning Model to classify user intents and provide supportive responses.

- Trained on a custom dataset using Keras with a TensorFlow backend.
- Uses NLTK for tokenization and lemmatization.
- Built with a simple Feedforward Neural Network, easily extendable to LSTM or Transformer models.
- Designed to respond interactively and empathetically to mental health-related queries.

---

## Web Scraping Module

To keep users informed, the app periodically scrapes the WHO website for the latest mental health fact sheets and news articles.

- Utilizes Python libraries like **BeautifulSoup** and **Requests** for data extraction.  
- Parses relevant news titles, links, and images to display in the frontend.  
- Ensures data freshness and relevance.

---

## Tech Stack

- **Frontend:** React, Material-UI (MUI)  
- **Backend:** Node.js / Python Flask (for API endpoints)  
- **Machine Learning:** Python, scikit-learn (Gradient Boosting), TensorFlow/Keras (Sequential models)  
- **NLP:** Custom deep learning models for chatbot interaction  
- **Web Scraping:** Python (BeautifulSoup, Requests)  
- **Deployment:** Localhost 

---

## Getting Started

1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/mindcheck.git
   cd mindcheck
2. Install backend dependencies (Python example):
   ```bash
   pip install -r requirements.txt
3. Install frontend dependencies:
   ```bash
   cd frontend
   npm install
4. Run backend server:
   ```bash
   python app.py
   
5. Run frontend:
   ```bash
   npm start

---
## Usage
- Navigate to the homepage to read about the project and access the prediction check.

- Complete the prediction form to receive your mental health assessment.

- Chat with the bot for real-time support and advice.

- Explore the latest mental health news curated from WHO.

---
## Contact
For questions or support, contact Lamia Omezzine at lamyaomz@gmail.com.   
