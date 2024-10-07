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
import { Grid } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useLoaderData } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/navbar";

interface CardData {
  id: number;
  blog_title: string;
  image: string;
  blog_body: string;
}

const commonImagePath = "./logo512.png";

export default function BlogCard() {
  const data: CardData[] = useLoaderData() as CardData[];

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
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Footer />
    </>
  );
}
