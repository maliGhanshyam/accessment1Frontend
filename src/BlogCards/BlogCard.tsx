import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Button, Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useLoaderData, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/navbar";
import { Link } from "react-router-dom"; // Correct for routing
import { deleteBlogById } from "../Model/BlogCrud";
interface CardData {
  _id: number;
  blog_title: string;
  image: string;
  blog_body: string;
}

const commonImagePath = "./logo512.png";

export default function BlogCard() {
  const data: CardData[] = useLoaderData() as CardData[];
 const navigate = useNavigate();
  const handleDelete = (_id: number) => {
    console.log("Delete Blog with ID:", _id);
    deleteBlog(_id);
  };
  async function deleteBlog(_id: Number) {
    console.log("inside delete");
    const data = await deleteBlogById(_id);
    console.log("delete data", data);
    if (data != null) {
      window.alert(`project with id ${_id} deleted successfully.....`);
      navigate("/cards");
    } else window.alert("Error during deletion");
  }
  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        {data.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card._id}>
            <Card
              sx={{ height: "100%", display: "flex", flexDirection: "column" }}
            >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: "primary.main" }} aria-label="recipe">
                    B
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={card.blog_title}
              />
              <CardMedia
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
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {card.blog_body}
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <Link
                  to={`/editblog/${card._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDelete(card._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
}
