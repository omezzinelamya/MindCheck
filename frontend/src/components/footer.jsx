import React from "react";
import { Box, Typography, Link, useTheme, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  const theme = useTheme();

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 4,
        py: 3,
        px: 2,
        bgcolor: "transparent",
        color: "rgba(228, 176, 201, 0.9)",
        textAlign: "center",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.03)",
        },
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        &copy; {new Date().getFullYear()} ThriveCheck. All rights reserved. |{" "}
        <Link
          href="https://yourcompany.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(228, 176, 201, 0.9)" 
          underline="hover"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Privacy Policy
        </Link>{" "}
        |{" "}
        <Link
          href="https://yourcompany.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          color="rgba(228, 176, 201, 0.9)" 
          underline="hover"
          sx={{
            transition: "color 0.3s ease",
            "&:hover": {
              color: theme.palette.secondary.main,
            },
          }}
        >
          Terms of Service
        </Link>
      </Typography>

      {/* Social Media Icons */}
      <Box sx={{ mb: 1 }}>
        <IconButton
          aria-label="Facebook"
          href="https://facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "rgba(228, 176, 201, 0.9)" , "&:hover": { color: theme.palette.secondary.main } }}
        >
          <FacebookIcon />
        </IconButton>
        <IconButton
          aria-label="Twitter"
          href="https://twitter.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color:"rgba(228, 176, 201, 0.9)" , "&:hover": { color: theme.palette.secondary.main } }}
        >
          <TwitterIcon />
        </IconButton>
        <IconButton
          aria-label="Instagram"
          href="https://instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ color: "rgba(228, 176, 201, 0.9)" , "&:hover": { color: theme.palette.secondary.main } }}
        >
          <InstagramIcon />
        </IconButton>
      </Box>

      {/* Back to Top Button */}
      <Box>
        <IconButton
          aria-label="Back to Top"
          onClick={handleBackToTop}
          sx={{
            color: "rgba(228, 176, 201, 0.9)",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color:"rgba(228, 176, 201, 0.9)" ,
              transform: "scale(1.2)",
              cursor: "pointer",
            },
          }}
        >
          <KeyboardArrowUpIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
