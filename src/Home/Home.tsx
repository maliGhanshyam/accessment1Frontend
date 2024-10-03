import React from "react";
import RecipeReviewCard from "../BlogCards/BlogCard"; 
import Footer from "../Footer/Footer"; // Import your Footer component
import Navbar from "../Navbar/navbar";

const Home: React.FC = () => {
  return (
      <>
          <Navbar></Navbar>
          <RecipeReviewCard></RecipeReviewCard>
          <Footer></Footer>
      </>
  );
};

export default Home;
