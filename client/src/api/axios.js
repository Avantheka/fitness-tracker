// axios.js
import axios from "axios";

export default axios.create({
  baseURL: "https://fitnesstracker-backend.onrender.com/api", 
  withCredentials: true,
});
