import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../MaterialUI/theme"; // Ensure your theme is correctly imported

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Login data submitted:", formData);
    // Redirect after login
    navigate("/dashboard");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>
      <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
        L
      </Avatar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              type="email"
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
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default LoginForm;
