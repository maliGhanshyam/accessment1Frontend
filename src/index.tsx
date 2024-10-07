import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Footer from "./Footer/Footer";
import RecipeReviewCard from "./BlogCards/BlogCard";
import ResponsiveAppBar from "./Navbar/navbar";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./MaterialUI/theme"; // Import your custom theme
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
      {" "}
      {/* Wrap App with BrowserRouter for routing */}
      <App />
  </React.StrictMode>
);
