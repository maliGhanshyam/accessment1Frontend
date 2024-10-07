import React from "react";
import Home from "./Home/Home"; 
import AddCard from "./BlogCards/AddCardForm"; 
import RecipeReviewCard from "./BlogCards/BlogCard"; 
import {
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BlogCard from "./BlogCards/BlogCard";
import { getAllBlogs } from "./Model/BlogCrud"; // Replace with actual import path
import AddCardForm from "./BlogCards/AddCardForm";
import LoginForm from "./Forms/LoginForm";
import RegistrationForm from "./Forms/RegistrationForm";
const cors = require("cors");

// Define the routes with loaders
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/add",
    element: <AddCard />,
  },
  {
    path: "/register",
    element: <AddCardForm />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/userRegistraion",
    element: <RegistrationForm />,
  },
  {
    path: "/cards",
    element: <RecipeReviewCard />,
    loader: async () => {
      return await getAllBlogs(); // Fetch data before rendering
    },
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;

