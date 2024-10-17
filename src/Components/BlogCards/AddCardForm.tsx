import React, { useEffect, useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Avatar,
  CircularProgress,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  ThemeProvider,
} from "@mui/material";
import theme from "../../MaterialUI/theme";
import { IBlog } from "../../Model/Blog";
import { addBlog, updateBlog } from "../../Model/BlogCrud";
import Navbar from "../Navbar/navbar";
import Footer from "../Footer/Footer";

const AddCardForm = () => {
  const blogData: IBlog | null = useLoaderData() as IBlog | null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IBlog>({
    _id: 0,
    blog_title: "",
    blog_body: "",
    blog_tags: "",
    blog_link: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (blogData) {
      setFormData({
        _id: blogData._id || 0,
        blog_title: blogData.blog_title || "",
        blog_body: blogData.blog_body || "",
        blog_tags: blogData.blog_tags || "",
        blog_link: blogData.blog_link || "",
      });
    }
  }, [blogData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Special handling for _id field to ensure it's always a number
    if (name === "_id") {
      const numericValue = value === "" ? 0 : parseInt(value, 10);
      if (!isNaN(numericValue)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: numericValue,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (blogData && blogData._id) {
        await updateBlog(formData);
      } else {
        await addBlog(formData);
      }
      navigate("/cards");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Navbar></Navbar>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom
        sx={{fontWeight:"bold",color:"primary.main"}}>
          {blogData ? "Update Blog" : "Add a New Blog"}
        </Typography>
        {/* <Avatar sx={{ bgcolor: theme.palette.primary.main, margin: "0 auto" }}>
          B
        </Avatar> */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {/* ID Field - Now more prominently displayed */}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <TextField
                  label="Blog ID"
                  variant="outlined"
                  name="_id"
                  type="number"
                  value={formData._id === 0 ? "" : formData._id}
                  onChange={handleChange}
                  disabled={!!blogData} // Only disable if editing existing blog
                  InputProps={{
                    inputProps: { min: 0 },
                  }}
                  helperText={
                    blogData
                      ? "ID cannot be changed for existing blogs"
                      : "Enter a unique ID for the blog"
                  }
                />
              </FormControl>
            </Grid>

            {/* Title Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Title"
                variant="outlined"
                name="blog_title"
                value={formData.blog_title}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Enter blog title"
              />
            </Grid>

            {/* Body Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Body"
                variant="outlined"
                name="blog_body"
                value={formData.blog_body}
                onChange={handleChange}
                required
                multiline
                rows={4}
                disabled={isSubmitting}
                placeholder="Enter blog content"
              />
            </Grid>

            {/* Tags Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Tags"
                variant="outlined"
                name="blog_tags"
                value={formData.blog_tags}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Enter tags (comma-separated)"
              />
            </Grid>

            {/* Link Field */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Blog Link"
                variant="outlined"
                name="blog_link"
                value={formData.blog_link}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                placeholder="Enter blog link/URL"
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : blogData ? (
                  "Update Blog"
                ) : (
                  "Add Blog"
                )}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
      <Footer></Footer>
    </ThemeProvider>
  );
};

export default AddCardForm;
