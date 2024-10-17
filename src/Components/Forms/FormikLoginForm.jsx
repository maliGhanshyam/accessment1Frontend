// import React from "react";
// import {
//   Button,
//   TextField,
//   Grid,
//   Typography,
//   Container,
//   ThemeProvider,
// } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup"; // Import Yup for validation
// import theme from "../../MaterialUI/theme";
// import { loginUser } from "../../Model/authCrud"; // Import login function
// import Navbar from "../Navbar/navbar";
// import Footer from "../Footer/Footer";

// // Validation schema using Yup
// const validationSchema = Yup.object().shape({
//   username: Yup.string().required("Username is required"),
//   password: Yup.string().required("Password is required"),
// });

// const LoginForm = () => {
//   const navigate = useNavigate();

//   const handleSubmit = async (
//     values: { username: string, password: string },
//     setStatus: (status: any) => void
//   ) => {
//     try {
//       const response = await loginUser(values.username, values.password);
//       if (response.token) {
//         console.log("Login successful:", response);
//         navigate("/cards"); // Redirect to dashboard or another authenticated route
//       }
//     } catch (error) {
//       // Use setStatus to set a form-wide error message
//       setStatus({ general: "Invalid credentials. Please try again." });
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <>
//         <Navbar />
//         <Container maxWidth="sm">
//           <Typography
//             variant="h4"
//             align="center"
//             gutterBottom
//             sx={{
//               fontWeight: "bold", // Make the text bold
//               color: "primary.main", // Set color to Material UI primary color
//               padding: 2,
//             }}
//           >
//             Login
//           </Typography>

//           <Formik
//             initialValues={{ username: "", password: "" }}
//             validationSchema={validationSchema}
//             onSubmit={async (values, { setSubmitting, setStatus }) => {
//               setSubmitting(true);
//               setStatus(null); // Clear any previous status
//               try {
//                 await handleSubmit(values, setStatus);
//               } finally {
//                 setSubmitting(false);
//               }
//             }}
//           >
//             {({ isSubmitting, errors, touched, status }) => (
//               <Form>
//                 <Grid container spacing={2} sx={{ marginTop: 2 }}>
//                   <Grid item xs={12}>
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       label="Username"
//                       variant="outlined"
//                       name="username"
//                       error={touched.username && Boolean(errors.username)}
//                       helperText={<ErrorMessage name="username" />}
//                       required
//                     />
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field
//                       as={TextField}
//                       fullWidth
//                       label="Password"
//                       variant="outlined"
//                       name="password"
//                       type="password"
//                       error={touched.password && Boolean(errors.password)}
//                       helperText={<ErrorMessage name="password" />}
//                       required
//                     />
//                   </Grid>

//                   {/* Display form-wide errors from status */}
//                   {status?.general && (
//                     <Grid item xs={12}>
//                       <Typography color="error" align="center">
//                         {status.general}
//                       </Typography>
//                     </Grid>
//                   )}

//                   <Grid item xs={12}>
//                     <Button
//                       type="submit"
//                       variant="contained"
//                       color="primary"
//                       fullWidth
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Logging in..." : "Login"}
//                     </Button>
//                   </Grid>
//                 </Grid>
//               </Form>
//             )}
//           </Formik>
//         </Container>
//         <Footer />
//       </>
//     </ThemeProvider>
//   );
// };

// export default LoginForm;
