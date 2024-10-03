import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home"; // Import your Home component
import AddCard from "./BlogCards/AddCardForm"; // Import your AddCard component
import RecipeReviewCard from "./BlogCards/BlogCard"; // Import your RecipeReviewCard component

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home route */}
      <Route path="/add" element={<AddCard />} /> {/* Route to add a card */}
      <Route path="/cards" element={<RecipeReviewCard />} />{" "}
      {/* Route to view cards */}
    </Routes>
  );
};

export default App;
