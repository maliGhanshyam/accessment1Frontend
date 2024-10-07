import axios from "axios";

const url = "http://localhost:5000/blogs";

export async function getAllBlogs() {
    const response = await axios.get(url + "/getall");
    console.log(response);
    return response.data;
}