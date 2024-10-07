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
    element: isAuthenticated() ? <Home /> : < Navigate to="/login" />,
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
