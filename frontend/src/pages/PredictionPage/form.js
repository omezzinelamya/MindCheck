import React, { useState } from "react";
import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
  Paper,
  Fade,
} from "@mui/material";

const steps = [
  {
    title: "Basic Info",
    fields: [
      { name: "Age", label: "Your Age", type: "number" },
      { name: "Gender", label: "Your Gender", type: "text" },
    ],
  },
  {
    title: "Work & Employment",
    fields: [
      {
        name: "self_employed",
        label: "Are you self-employed?",
        type: "select",
        options: ["Yes", "No", "Unknown"],
      },
      {
        name: "no_employees",
        label: "Company size?",
        type: "select",
        options: ["1-5", "6-25", "26-100", "100-500", "500-1000", "More than 1000"],
      },
      {
        name: "tech_company",
        label: "Do you work in a tech company?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        name: "remote_work",
        label: "Do you work remotely?",
        type: "select",
        options: ["Yes", "No"],
      },
    ],
  },
  {
    title: "Mental Health History",
    fields: [
      {
        name: "family_history",
        label: "Family history of mental illness?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        name: "treatment",
        label: "Have you sought treatment?",
        type: "select",
        options: ["Yes", "No"],
      },
      {
        name: "work_interfere",
        label: "Does mental health interfere with your work?",
        type: "select",
        options: ["Never", "Rarely", "Sometimes", "Often", "Unknown"],
      },
    ],
  },
  {
    title: "Workplace Environment",
    fields: [
      {
        name: "anonymity",
        label: "Is anonymity respected at work?",
        type: "select",
        options: ["Yes", "No", "Don't know"],
      },
      {
        name: "leave",
        label: "Ease of taking mental health leave?",
        type: "select",
        options: [
          "Very easy",
          "Somewhat easy",
          "Somewhat difficult",
          "Very difficult",
          "Don't know",
        ],
      },
      {
        name: "benefits",
        label: "Are mental health benefits offered?",
        type: "select",
        options: ["Yes", "No", "Don't know"],
      },
      {
        name: "care_options",
        label: "Aware of care options at work?",
        type: "select",
        options: ["Yes", "No", "Not sure"],
      },
    ],
  },
];

export default function StepWizard() {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(steps.flatMap((s) => s.fields.map((f) => [f.name, ""])))
  );
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState({ experience: "", reflection: "" });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const isValid = () => steps[currentStep].fields.every(({ name }) => formData[name] !== "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    const predictionData = {
      Age: formData.Age,
      Gender: formData.Gender,
      family_history: formData.family_history,
      benefits: formData.benefits,
      care_options: formData.care_options,
      anonymity: formData.anonymity,
      leave: formData.leave,
      work_interfere: formData.work_interfere,
    };

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(predictionData),
      });
      const data = await res.json();
      setResult(data);
      setShowResult(true);
    } catch {
      setResult({ error: "Failed to fetch prediction" });
      setShowResult(true);
    }
  };

  const handleTryAgain = () => {
    setCurrentStep(0);
    setFormData(Object.fromEntries(steps.flatMap((s) => s.fields.map((f) => [f.name, ""]))));
    setResult(null);
    setShowResult(false);
    setFeedback({ experience: "", reflection: "" });
    setFeedbackSubmitted(false);
  };

  const submitFeedback = () => {
    console.log("Feedback:", feedback);
    setFeedbackSubmitted(true);
  };

  return (
    <Paper
      sx={{
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 3,
        borderRadius: 2,
        backgroundColor: "rgba(192, 183, 188, 0.1)",
      }}
    >
      <Typography variant="h5" mb={2}>
        Step {currentStep + 1} of {steps.length}
      </Typography>

      <LinearProgress
        variant="determinate"
        value={((currentStep + 1) / steps.length) * 100}
        sx={{
          mb: 3,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "rgba(222, 61, 150, 0.23)",
          },
        }}
      />

      {!result && (
        <>
          {steps[currentStep].fields.map(({ name, label, type, options }) => (
            <Box key={name} mb={2}>
              {type === "select" ? (
                <TextField
                  select
                  name={name}
                  label={label}
                  fullWidth
                  value={formData[name]}
                  onChange={handleChange}
                >
                  {options.map((o) => (
                    <MenuItem key={o} value={o}>
                      {o}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  type={type}
                  name={name}
                  label={label}
                  value={formData[name]}
                  onChange={handleChange}
                />
              )}
            </Box>
          ))}

          <Box display="flex" justifyContent="space-between" mt={3}>
            <Button
              variant="outlined"
              onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
              disabled={currentStep === 0}
            >
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button variant="contained" onClick={() => setCurrentStep((s) => s + 1)} disabled={!isValid()}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} disabled={!isValid()}>
                Submit
              </Button>
            )}
          </Box>

          <Typography
            variant="body2"
            mt={4}
            textAlign="center"
            color="rgba(120, 105, 111, 0.7)"
          >
            💡 Your answers remain private and help us better support mental health.
          </Typography>
        </>
      )}

      {result && (
        <Fade in={showResult}>
          <Box mt={2} p={3} borderRadius={2} bgcolor="rgba(214, 209, 209, 0.6)">
            <Typography variant="h6" fontWeight="bold" mb={1}>
              {result.prediction === 1 ? "🩺 Needs Treatment" : "✅ No Treatment Needed"}
            </Typography>
            <Typography mb={2}>Probability: {(result.probability * 100).toFixed(2)}%</Typography>
            <Typography mb={3}>
              {result.prediction === 1
                ? "We recommend speaking with a mental health professional. You're not alone."
                : "You appear to be doing well. Keep prioritizing your mental wellbeing!"}
            </Typography>

            <Button variant="contained" onClick={handleTryAgain}>
              Try Again
            </Button>

            {!feedbackSubmitted ? (
              <Box mt={4}>
                <Typography variant="subtitle1" mb={1}>
                  We'd love your feedback
                </Typography>
                <TextField
                  name="experience"
                  label="How was your experience?"
                  fullWidth
                  multiline
                  rows={3}
                  value={feedback.experience}
                  onChange={(e) => setFeedback((f) => ({ ...f, experience: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <TextField
                  name="reflection"
                  label="Did the form help you reflect?"
                  fullWidth
                  multiline
                  rows={3}
                  value={feedback.reflection}
                  onChange={(e) => setFeedback((f) => ({ ...f, reflection: e.target.value }))}
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={submitFeedback}>
                  Submit Feedback
                </Button>
              </Box>
            ) : (
              <Typography color="success.main" mt={3}>
                🙏 Thank you for your feedback!
              </Typography>
            )}

            <Typography
              variant="body2"
              mt={5}
              fontStyle="italic"
              textAlign="center"
              color="rgba(138, 123, 130, 0.7)"
            >
              “Taking care of your mental health is a sign of strength.” 💚
            </Typography>
          </Box>
        </Fade>
      )}
    </Paper>
  );
}
