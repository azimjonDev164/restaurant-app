import axios from "axios";

const API = axios.create({
  baseURL: "https://restaurant-server-jo1z.onrender.com", // your backend URL
});

export default API;
