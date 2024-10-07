import axios from "axios";
import { getToken } from "./authCrud"; // Import the function that retrieves the token

const url = "http://localhost:5000/blogs";

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

