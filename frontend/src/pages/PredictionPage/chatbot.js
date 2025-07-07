import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      text: "👋 Hi there! I'm MindWork Assistant — your mental wellness companion for workplace challenges. How are you feeling today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null); // 🆕 for speech-to-text

  // 🧠 Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US"; // change if needed
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript); // Auto-fill the input field
      };

      recognition.onerror = (e) => {
        console.error("Speech recognition error", e.error);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  // 🔊 Function to speak bot message aloud
  const speakBotMessage = (message) => {
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-US"; // Change language if needed
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✉️ Send message and handle bot response
  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((msgs) => [...msgs, { text: trimmed, sender: "user" }]);
    setInput("");

    try {
      const res = await fetch(
        `http://localhost:5000/bot?msg=${encodeURIComponent(trimmed)}`
      );
      const text = await res.text();
      setMessages((msgs) => [...msgs, { text, sender: "bot" }]);
      speakBotMessage(text); // 🔊 Speak bot message
    } catch {
      const errorMsg = "❌ Sorry, something went wrong.";
      setMessages((msgs) => [...msgs, { text: errorMsg, sender: "bot" }]);
      speakBotMessage(errorMsg);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  // 🎙️ Handle voice input
  const handleVoiceInput = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
    }
  };

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        bgcolor: "rgba(192, 183, 188, 0.1)",
        p: 2,
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "rgba(138, 123, 130, 0.9)",
          mb: 2,
          textAlign: "center",
        }}
      >
        MindWork Assistant
      </Typography>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          mb: 2,
          px: 1,
        }}
      >
        {messages.map((msg, i) => (
          <Box
            key={i}
            sx={{
              maxWidth: "75%",
              mb: 1,
              p: 1.5,
              borderRadius: 2,
              bgcolor:
                msg.sender === "user"
                  ? "rgba(222, 61, 150, 0.15)"
                  : "rgba(228, 215, 221, 0.7)",
              color: "rgba(56, 34, 44, 0.9)",
              alignSelf:
                msg.sender === "user" ? "flex-end" : "flex-start",
              wordBreak: "break-word",
            }}
          >
            <Typography variant="body2">{msg.text}</Typography>
          </Box>
        ))}
        <div ref={messagesEndRef} />
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          size="small"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          fullWidth
          sx={{
            bgcolor: "white",
            borderRadius: 2,
          }}
        />
        <Button
          variant="contained"
          onClick={sendMessage}
          sx={{
            bgcolor: "rgba(222, 61, 150, 0.23)",
            "&:hover": {
              bgcolor: "rgba(222, 61, 150, 0.23)",
            },
          }}
        >
          Send
        </Button>
        <Button
          variant="outlined"
          onClick={handleVoiceInput}
          sx={{
            bgcolor: "white",
            minWidth: "40px",
            p: 1,
          }}
        >
          🎤
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
