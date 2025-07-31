// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://fitnesstracker-backend.onrender.com", 
  withCredentials: true,
});

export default instance;
