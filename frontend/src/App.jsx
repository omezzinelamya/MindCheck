import { useState } from 'react'
import './App.css'
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useMemo } from "react";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { themeSettings } from "./theme";

import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage/HomePage.js";
import PredictionPage from "./pages/PredictionPage/PredictionPage.js";
import Footer from "./components/footer.jsx";

function App() {
  // Create MUI theme once using useMemo
  const theme = useMemo(() => createTheme(themeSettings), []);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box width="100%" minHeight="100vh" padding="1rem 2rem 2rem 2rem">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/Welcome" element={<HomePage />} />
              <Route path="/assessment" element={<PredictionPage />} />

            </Routes>
            <Footer />

          </Box>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
