import React from "react";
import Home from "./Home/Home";
import AddCard from "./BlogCards/AddCardForm";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import BlogCard from "./BlogCards/BlogCard";
import { getAllBlogs } from "./Model/BlogCrud";
import AddCardForm from "./BlogCards/AddCardForm";
import LoginForm from "./Forms/LoginForm";
import RegistrationForm from "./Forms/RegistrationForm";
import { isAuthenticated } from "./utils/auth"; // Import the utility function
import { getBlogById } from "./Model/BlogCrud";

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
    element: <BlogCard />,
    loader: async () => {
      return await getAllBlogs();
    },
  },
  {
    path: "/home",
    element: isAuthenticated() ? <Home /> : <Navigate to="/login" />,
  },
  {
    path: "editblog/:_id",
    element: <AddCardForm />,
    loader: async ({ params }) => {
      try {
        const blog = await getBlogById(Number(params._id)); // Convert params.id to number if it's expected to be a number
        console.log("Loaded Blog Data: ", blog); // Check if the data is correctly loaded
        return { ...blog, _id: blog._id }; // Return the blog object with id property
      } catch (error) {
        console.error("Error loading blog:", error);
        throw error; // Handle or rethrow the error as needed
      }
    },
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
