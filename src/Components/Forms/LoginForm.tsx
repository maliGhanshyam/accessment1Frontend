import React, { useState } from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  // Avatar,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import theme from "../../MaterialUI/theme";
import { loginUser } from "../../Model/authCrud"; // Import login function
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup"; // Import Yup for validation
// import { Password } from "@mui/icons-material";

const LoginForm = () => {
  interface LoginData {
    username: string;
    password: string;
  }
  // Validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string()
      .required("Password is required")
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });
  // const [formData, setFormData] = useState({ username: "", password: "" });
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     const response = await loginUser(formData.username, formData.password);
  //     if (response.token) {
  //       console.log("Login successful:", response);
  //       navigate("/cards"); // Redirect to dashboard or another authenticated route
  //     }
  //   } catch (error) {
  //     setErrorMessage("Invalid credentials. Please try again.");
  //   }
  // };
  const handleSubmit = async (
    loginData: LoginData,
    // setStatus: (status: any) => void
    { setSubmitting, setStatus }: FormikHelpers<LoginData>
  ) => {
    try {
      const response = await loginUser(loginData.username, loginData.password);
      if (response && (response as { token?: string }).token) {
        console.log("Login successful:", response);
        setStatus({ success: true, message: "Login successful" });
        navigate("/cards"); // Redirect to dashboard or another authenticated route
      }
      console.log("From Formik Form", loginData);
    } catch {
      setStatus({ success: false, message: "Invalid credentials" });
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
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, handleChange, handleBlur, values, status }) => (
              <Form>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      variant="outlined"
                      name="username"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // required
                      type="text"
                      helperText={<ErrorMessage name="username" />}
                      error={!!values.username && !!values.username.trim()}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      variant="outlined"
                      name="password"
                      // value={formData.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      // required
                      type="password"
                      helperText={<ErrorMessage name="password" />}
                      error={!!values.password && !!values.password.trim()}
                    />
                  </Grid>
                  {/* {errorMessage && (
                    <Grid item xs={12}>
                      <Typography color="error" align="center">
                        {errorMessage}
                      </Typography>
                    </Grid>
                  )} */}
                  {/* Display form-wide errors from status */}{" "}
                  {status?.general && (
                    <Grid item xs={12}>
                      {" "}
                      <Typography color="error" align="center">
                        {" "}
                        {status.general}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      Login
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Container>
        <Footer></Footer>
      </>
    </ThemeProvider>
  );
};

export default LoginForm;
