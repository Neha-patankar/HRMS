

import axios from "axios";

export const api = axios.create({
  // baseURL: "http://localhost:5000/api", 
  baseURL: "https://hrms-backend-0r30.onrender.com/api",
  // withCredentials: true
});


