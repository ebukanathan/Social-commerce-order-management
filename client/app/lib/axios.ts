import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api", // change in production
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
