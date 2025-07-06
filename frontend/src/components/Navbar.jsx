import { GiMeditation } from "react-icons/gi";
import { Box, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FlexedBox from "./FlexedBox";

function Navbar() {
  const { palette } = useTheme();
  const [active, setActive] = useState("home");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path === "/" || path === "/home") {
      setActive("home");
    } else if (path === "/prediction") {
      setActive("prediction");
    }
  }, [location.pathname]);

  return (
    <FlexedBox mb="0.25rem" p="0.5rem 1rem" justifyContent="space-between" alignItems="center" color={palette.grey[300]}>
      {/* LEFT SIDE */}
      <FlexedBox gap="0.75rem" alignItems="center">
        <GiMeditation size={40} color="rgba(228, 176, 201, 0.9)" />
        <Typography variant="h4" fontSize="18px" fontWeight="bold" sx={{ color: "rgba(138, 123, 130, 0.9)" }}>
          MindCheck
        </Typography>
      </FlexedBox>

      {/* RIGHT SIDE */}
      <FlexedBox gap="2rem" alignItems="center">
        <Link
          to="/home"
          onClick={() => setActive("home")}
          style={{
            color: active === "home" ? "rgba(157, 134, 145, 0.9)" : palette.grey[700],
            fontWeight: active === "home" ? "bold" : "normal",
            textDecoration: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Home
        </Link>

        <Link
          to="/prediction"
          onClick={() => setActive("prediction")}
          style={{
            color: active === "prediction" ? "rgba(157, 134, 145, 0.9)" : palette.grey[700],
            fontWeight: active === "prediction" ? "bold" : "normal",
            textDecoration: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Prediction
        </Link>
      </FlexedBox>
    </FlexedBox>
  );
}

export default Navbar;
