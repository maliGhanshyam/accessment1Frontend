import axios from "axios";
import { getToken } from "./authCrud"; // Import the function that retrieves the token
import { IBlog } from "../Model/Blog"; // Import the frontend IBlog interface

// const url = "http://localhost:5000/blogs";
const API_URL = process.env.REACT_APP_API_URL;
const url = `${API_URL}/blogs`;

console.log("Blog URL", url);

export async function getAllBlogs() {
  const token = getToken(); // Get the token from session storage

  try {
    const response = await axios.get(url + "/getall", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error; // Handle the error appropriately in the UI
  }
}

export async function updateBlog(blog: IBlog): Promise<IBlog> {
  const token = getToken(); // Get the token from session storage

  try {
    const response = await axios.put<IBlog>(`${url}/update/${blog._id}`, blog, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating blog:", error);
    throw error;
  }
}

// Define the function to fetch a blog by its _id
export async function getBlogById(_id: number): Promise<IBlog> {
  const token = getToken(); // Get the token from session storage

  try {
    const response = await axios.get<IBlog>(`${url}/get/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    });
    console.log("From getBlogById function:", _id);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by ID:", error);
    throw error; // Propagate the error to the caller
  }
}
export async function addBlog(blog: IBlog) {
  const token = getToken();
  try {
    const response = await axios.post(`${url}/add`, blog, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("added response", response);
    return response;
  } catch (error) {
    console.error("Error adding projects:", error);
    throw error;
  }
}
export async function deleteBlogById(_id: Number) {
  const token = getToken();
  try {
    const response = await axios.delete(`${url}/delete/${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("delete response", response);
    return response;
  } catch (error) {
    console.error("Error deleting Blog:", error);
    throw error;
  }
}