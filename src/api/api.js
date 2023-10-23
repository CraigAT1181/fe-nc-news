import axios from "axios";

const api = axios.create({
  baseURL: "https://northcoders-project.onrender.com/api",
});

export default api;
