import * as React from "react";
// import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
// import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid, Menu, MenuItem, Chip, Box } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useLoaderData, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom";
import { deleteBlogById } from "../../Model/BlogCrud";

interface CardData {
  _id: number;
  blog_title: string;
  image: string;
  blog_body: string;
  blog_tags: string; // String of tags separated by commas
  blog_link: string;
}

// const commonImagePath = "./logo512.png";

export default function BlogCard() {
  const data: CardData[] | undefined = useLoaderData() as CardData[]; // Updated to allow undefined
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleShareClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (_id: number) => {
    console.log("Delete Blog with ID:", _id);
    deleteBlog(_id);
  };

  async function deleteBlog(_id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Blog?"
    );
    if (confirmed) {
      await deleteBlogById(_id);
      if (data != null) {
        window.alert(`Project with id ${_id} deleted successfully.`);
        navigate("/cards");
      } else window.alert("Error during deletion");
    } else {
      window.alert("Error during deletion of blog");
    }
  }

  const postUrl = encodeURIComponent(window.location.href);
  const postTitle = encodeURIComponent("Check out this blog: ");

  // Added loading state check
  if (!data) {
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    ); // Loading message while data is fetched
  }

  return (
    <>
      <Navbar />
      <Grid container spacing={3}>
        {data.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: "center", width: "100%" }}>
            No blogs available.
          </Typography>
        ) : (
          data.map((card, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={card._id}
              sx={{
                // Apply left margin for the first card and right margin for the last card
                ...(index === 0 && { ml: 4 }), // Margin-left for the first card
                ...(index === data.length - 1 && { mr: 4 }), // Margin-right for the last card
              }}
            >
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardHeader
                  // avatar={
                  //   <Avatar
                  //     sx={{ bgcolor: "primary.main" }}
                  //     aria-label="recipe"
                  //   >
                  //     B
                  //   </Avatar>
                  // }
                  title={
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: "bold", textAlign: "center" }}
                    >
                      {card.blog_title}
                    </Typography>
                  }
                />
                {/* <CardMedia
                  component="img"
                  height="150"
                  sx={{
                    objectFit: "contain",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mx: "auto",
                  }}
                  image={commonImagePath}
                  alt={card.blog_title}
                /> */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {card.blog_body}
                  </Typography>
                </CardContent>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      mt: 1,
                      fontWeight: "bold",
                    }}
                  >
                    {card.blog_tags.split(",").map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag.trim()} // Trim to remove extra spaces
                        sx={{ margin: "4px" }} // Add margin for spacing
                      />
                    ))}
                  </Box>
                </CardContent>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    <a
                      href={card.blog_link} // Use the blog link as the href
                      target="_blank" // Opens the link in a new tab
                      rel="noopener noreferrer" // Security best practices
                      style={{ textDecoration: "none", color: "inherit" }} // Remove default styles and inherit color
                    >
                      {card.blog_link}
                    </a>
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    justifyContent: "center", // Center the items
                    backgroundColor: "#f5f5f5", // Optional: Add background color for the CardActions
                    padding: 1, // Optional: Add padding
                  }}
                >
                  <IconButton
                    aria-label="share"
                    onClick={handleShareClick}
                    sx={{ color: "primary.main", marginleft:2 }} // Change color of the share button
                  >
                    <ShareIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component="a"
                      href={`https://www.facebook.com/sharer.php?u=${postUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookIcon sx={{ color: "#3b5998", marginRight: 1 }} />
                      Facebook
                    </MenuItem>
                    <MenuItem
                      component="a"
                      href={`https://twitter.com/share?url=${postUrl}&text=${postTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterIcon sx={{ color: "#1da1f2", marginRight: 1 }} />
                      Twitter
                    </MenuItem>
                    <MenuItem
                      component="a"
                      href={`https://pinterest.com/pin/create/bookmarklet/?url=${postUrl}&description=${postTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <PinterestIcon
                        sx={{ color: "#bd081c", marginRight: 1 }}
                      />
                      Pinterest
                    </MenuItem>
                    <MenuItem
                      component="a"
                      href={`https://www.linkedin.com/shareArticle?url=${postUrl}&title=${postTitle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedInIcon sx={{ color: "#0077b5", marginRight: 1 }} />
                      LinkedIn
                    </MenuItem>
                    <MenuItem
                      component="a"
                      href={`https://wa.me/?text=${postTitle} ${postUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <WhatsAppIcon sx={{ color: "#25d366", marginRight: 1 }} />
                      WhatsApp
                    </MenuItem>
                  </Menu>
                  <Link
                    to={`/editblog/${card._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <IconButton
                      aria-label="edit"
                      sx={{ color: "secondary.main" }} // Change color of the edit button
                    >
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(card._id)}
                    sx={{ color: "#bd081c", marginRight: 1 }} // Keep delete color as is
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
      <Footer />
    </>
  );
}
