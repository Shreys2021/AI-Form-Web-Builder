import axios from "axios";

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/ai",
});

export default API;
