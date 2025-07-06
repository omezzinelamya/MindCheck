import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  useTheme,
  Card,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";

export default function Home() {
  const theme = useTheme();

  const [factSheets, setFactSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/related-fact-sheets')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch fact sheets');
        return res.json();
      })
      .then(data => {
        setFactSheets(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      alignItems="stretch"
      justifyContent="space-between"
      minHeight="60vh"
      gap={4}
      p={4}
      maxWidth={1200}
      mx="auto"
      bgcolor="rgba(192, 183, 188, 0.1)" // light pink background
      borderRadius={3}
    >
      {/* LEFT SIDE */}
      <Box
        flex="0 1 40%"
        maxWidth={450}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        textAlign={{ xs: "center", md: "left" }}
        px={{ xs: 2, md: 0 }}
        sx={{
          color: "#ff1493", // pink text for heading
          fontWeight: "bold",
        }}
      >
        <Typography
          variant="h3"
          mb={3}
          sx={{
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: "bold",
            lineHeight: 1.2,
            color: "rgba(101, 96, 98, 0.9)", // darker pink for paragraph

          }}
        >
          Check In on Your Mental Health, Before Work Burns You Out.
        </Typography>
        <Typography
          variant="h6"
          mb={4}
          sx={{
            fontSize: { xs: "1.1rem", md: "1.5rem" },
            color: "rgba(162, 148, 155, 0.9)", // darker pink for paragraph
          }}
        >
          Inspired by thousands of tech workers just like you, this short check-in can help you understand if work might be impacting your mental health and whether it’s time to seek help.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/prediction"
          sx={{
            bgcolor: "rgba(203, 117, 163, 0.3)" , // strong pink button
            color: "rgba(107, 94, 100, 0.9)",
            fontWeight: "bold",
            px: 4,
            py: 1.5,
            borderRadius: 2,
            "&:hover": {
              bgcolor: "rgba(203, 117, 163, 0.3)" , // darker pink for paragraph
            },
            textTransform: "none",
                    }}
        >
          Take the Check
        </Button>
      </Box>

      {/* VERTICAL DIVIDER */}
      <Divider
        orientation="vertical"
        flexItem
        sx={{ display: { xs: "none", md: "block" }, borderColor: "rgba(156, 119, 138, 0.9)"}}
      />

      {/* RIGHT SIDE */}
      <Box
        flex="1"
        maxWidth={600}
        sx={{
          overflowY: "auto",
          maxHeight: "70vh",
          pr: 2,
          bgcolor: "rgba(192, 183, 188, 0.1)", // super light pink background
          borderRadius: 3,
          p: 2,
          // Scrollbar styles
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(228, 215, 221, 0.9)",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
          },
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          textAlign="center"
          sx={{ color: "rgba(138, 123, 130, 0.9)" }}
        >
          Related Mental Health Fact Sheets
        </Typography>

        {loading && (
          <Box display="flex" justifyContent="center" py={6}>
            <CircularProgress sx={{ color: "#ff1493" }} />
          </Box>
        )}

        {error && (
          <Typography color="error" textAlign="center" mb={3}>
            {error}
          </Typography>
        )}

        {!loading && !error && factSheets.length === 0 && (
          <Typography textAlign="center" color="rgba(138, 123, 130, 0.9)">
            No fact sheets available at the moment.
          </Typography>
        )}

        {!loading &&
          !error &&
          factSheets.map(({ title, link, image }, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{
                mb: 3,
                bgcolor: "rgba(192, 183, 188, 0.1)",
                borderRadius: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                transition: "box-shadow 0.3s ease",
                "&:hover": {
                  boxShadow: "0 6px 20px rgba(203, 117, 163, 0.3)",
                },
              }}
              onClick={() => window.open(link, "_blank")}
            >
              {image && (
                <Box
                  component="img"
                  src={image}
                  alt={title}
                  sx={{
                    width: 140,
                    height: 90,
                    objectFit: "cover",
                    borderRadius: 2,
                    mr: 3,
                    flexShrink: 0,
                  }}
                />
              )}
              <CardContent sx={{ flex: 1, overflow: "hidden" }}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  gutterBottom
                  sx={{
                    textAlign: "left",
                    whiteSpace: "normal",
                    color: "rgba(120, 105, 111, 0.69)",
                  }}
                >
                  {title}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>
    </Box>
  );
}
