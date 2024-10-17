import React, { useState } from "react";
import { register } from "../../Model/authCrud";
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
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/navbar";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    _id: 0,
    username: "",
    email: "",
    password: "",
  });
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
    registerForm();
  };
  async function registerForm() {
    const data = await register(formData);
    if (data != null) {
      window.alert(`user registered successfully.....`);
      navigate("/login");
    } else window.alert("Error during registration");
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Navbar></Navbar>
        <Container maxWidth="sm">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{ color: "primary.main", margin: 2, fontWeight:"bold"}}
          >
            Register
          </Typography>
          {/* <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
          R
        </Avatar> */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Id"
                  variant="outlined"
                  name="_id"
                  value={formData._id}
                  required
                  onChange={handleChange}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="User Name"
                  variant="outlined"
                  name="username"
                  value={formData.username}
                  required
                  onChange={handleChange}
                  type="text"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="outlined"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
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
                  required
                  onChange={handleChange}
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Register
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

export default RegistrationForm;
