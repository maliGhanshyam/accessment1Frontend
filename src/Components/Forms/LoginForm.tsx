import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../MaterialUI/theme";
import { loginUser } from "../../Model/authCrud"; // Import login function
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";

const LoginForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData.username, formData.password);
      if (response.token) {
        console.log("Login successful:", response);
        navigate("/cards"); // Redirect to dashboard or another authenticated route
      }
    } catch (error) {
      setErrorMessage("Invalid credentials. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar></Navbar>{" "}
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: "bold", // Make the text bold
              color: "primary.main", // Set color to Material UI primary color
              padding: 2,
            }}
          >
            Login
          </Typography>
          {/* <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
          L
        </Avatar> */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Username"
                  variant="outlined"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  variant="outlined"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  type="password"
                />
              </Grid>
              {errorMessage && (
                <Grid item xs={12}>
                  <Typography color="error" align="center">
                    {errorMessage}
                  </Typography>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
        <Footer></Footer>
      </>
    </ThemeProvider>
  );
};

export default LoginForm;
