// src/Footer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../MaterialUI/theme";

const Footer: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "primary.main", // Use primary color from the theme
          color: "white",
          p: 2,
          textAlign: "center",
          position: "fixed", // Fixes the footer at the bottom
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Typography variant="body1">
          © {new Date().getFullYear()} Blogger.Inc. All Rights Reserved.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
