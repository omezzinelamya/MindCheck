import React from "react";
import { Box, Divider } from "@mui/material";
import StepWizard from "./form";
import Chatbot from "./chatbot";

const PredictionPage = () => {
  return (
    <Box
  display="flex"
  flexDirection={{ xs: "column", md: "row" }}
  gap={4}
  maxWidth={1200}
  mx="auto"
  p={4}
  bgcolor="rgba(192, 183, 188, 0.1)"
  borderRadius={3}
  width="100%"
>
  {/* Formulaire */}
  <Box
    flex="0 1 40%"       // largeur de base 40%, peut s'adapter
    minWidth={{ xs: "100%", md: 400 }}  // au moins 100% sur mobile, 400px sur desktop
    px={{ xs: 0, md: 2 }}
  >
    <StepWizard />
  </Box>
 {/* VERTICAL DIVIDER */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(156, 119, 138, 0.9)"}}
      />
  {/* Chatbot */}
  <Box
    flex="1"            // prendra le reste de l'espace dispo
    minWidth={{ xs: "100%", md: 500 }}
    px={{ xs: 0, md: 2 }}
  >
    <Chatbot />
  </Box>
</Box>

  );
};

export default PredictionPage;
