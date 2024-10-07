import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useLoaderData } from "react-router-dom";
import Footer from "../Footer/Footer"; // Import your Footer component
import Navbar from "../Navbar/navbar";

interface CardData {
  id: number; // or string depending on your data
  blog_title: string;
  image: string;
  blog_body: string;
}
const commonImagePath = "./logo512.png";
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  ...(props) => ({
    transform: props.expand ? "rotate(180deg)" : "rotate(0deg)",
  }),
}));

export default function RecipeReviewCard() {
  const data: CardData[] = useLoaderData() as CardData[]; // Ensure correct typing

  return (
    <>
      <Navbar />
      <Grid container spacing={2}>
        {data.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
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
                  objectFit: "contain", // Ensures the entire image is visible and maintains aspect ratio
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  mx: "auto", // Centers the image horizontally
                }}
                image={commonImagePath}
                alt={card.blog_title} // Use a descriptive alt text
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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
}
