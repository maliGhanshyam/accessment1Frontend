import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material"; // Import Grid component
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../MaterialUI/theme";

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
  variants: [
    {
      props: { expand: false },
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: { expand: true },
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

const cardData = [
  {
    id: 1,
    title: "Impact Of AI on Development",
    date: "September 14, 2024",
    description:
      "This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.",
    image: "./logo512.png",
    method:
      "Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10 minutes.",
  },
  {
    id: 2,
    title: "The Future of Space Exploration",
    date: "September 15, 2024",
    description:
      "Space exploration has captured human imagination for decades. Join us as we delve into the advancements that shape our journey to the stars.",
    image: "./logo512.png",
    method:
      "Astronauts will undergo rigorous training and simulations to prepare for long-duration missions in space.",
  },
  {
    id: 3,
    title: "Advancements in Quantum Computing",
    date: "September 16, 2024",
    description:
      "Quantum computing holds the promise of solving problems that are currently unsolvable. Let's explore its potential.",
    image: "./logo512.png",
    method:
      "Researchers are developing quantum algorithms to tackle complex computations beyond classical capabilities.",
  },
  {
    id: 4,
    title: "The Rise of Renewable Energy",
    date: "September 17, 2024",
    description:
      "Renewable energy is crucial for a sustainable future. Learn about the latest innovations in this field.",
    image: "./logo512.png",
    method:
      "Solar, wind, and hydroelectric power are revolutionizing energy production and consumption.",
  },
  // Add more cards as needed
];

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState<{ [key: number]: boolean }>(
    {}
  );

  const handleExpandClick = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Grid container spacing={2}>
      {cardData.map((card) => (
        <Grid item xs={12} sm={6} md={4} key={card.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{ bgcolor: theme.palette.primary.main }}
                  aria-label="recipe"
                >
                  B
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={card.title}
              subheader={card.date}
            />
            <CardMedia
              component="img"
              height="150"
              sx={{
                maxHeight: "100%", // Ensure it doesn't exceed the height
                objectFit: "contain", // Fit within the box without cropping
                alignItem: "center",
              }}
              image={card.image}
              alt="Paella dish"
            />
            <CardContent>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {card.description}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
              <ExpandMore
                expand={expanded[card.id] || false}
                onClick={() => handleExpandClick(card.id)}
                aria-expanded={expanded[card.id] || false}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded[card.id]} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>{card.method}</Typography>
                {/* Additional content can be added here */}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
