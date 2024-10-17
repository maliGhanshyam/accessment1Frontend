import React from "react";
import Home from "./Components/Home/Home";
import AddCardForm from "./Components/BlogCards/AddCardForm";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import BlogCard from "./Components/BlogCards/BlogCard";
import { getAllBlogs, getBlogById } from "./Model/BlogCrud";
import LoginForm from "./Components/Forms/LoginForm";
import RegistrationForm from "./Components/Forms/RegistrationForm";
import { isAuthenticated } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/addBlog",
    element: isAuthenticated() ? <AddCardForm /> : <Navigate to="/login" />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/userRegistration", // Corrected typo here
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
        const id = params._id ? Number(params._id) : null; // Ensure params._id is defined and convert to number

        if (!id) {
          throw new Error("Invalid blog ID");
        }

        const blog = await getBlogById(id); // Call the function with a valid number

        console.log("Loaded Blog Data: ", blog);
        return { ...blog, _id: blog._id }; // Return the blog object
      } catch (error) {
        console.error("Error loading blog:", error);
        throw error; // Handle the error
      }
    },
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
