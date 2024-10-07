import React from "react";
import Footer from "../Footer/Footer"; // Import your Footer component
import Navbar from "../Navbar/navbar";
import BlogCard from "../BlogCards/BlogCard";

const Home: React.FC = () => {
  return (
    <>
      <Navbar></Navbar>
      <BlogCard></BlogCard>
      <Footer></Footer>
    </>
  );
};

export default Home;
