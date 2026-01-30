
// import axios from "axios";

// export const api = axios.create({
//   // baseURL: "http://localhost:5000/api", 
//   baseURL: "https://hrms-backend-0r30.onrender.com/api",
// });

import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Env variable
  headers: {
    "Content-Type": "application/json",
  },
});

