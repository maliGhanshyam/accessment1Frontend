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
import theme from "../MaterialUI/theme"; // Ensure to import your theme

const AddCardForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    image: "",
    method: "",
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
    // Here you can send the data to your backend or handle it as needed
    console.log("Form data submitted:", formData);
    // Reset the form after submission
    setFormData({
      title: "",
      date: "",
      description: "",
      image: "",
      method: "",
    });
    // Redirect to home or another page after submission
    navigate("/");
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Add a New Card
      </Typography>
      <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
        A
      </Avatar>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Title"
              variant="outlined"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              variant="outlined"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              variant="outlined"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              name="image"
              value={formData.image}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Method"
              variant="outlined"
              name="method"
              value={formData.method}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Add Card
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default AddCardForm;
