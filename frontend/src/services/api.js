import axios from "axios";

const api = axios.create({
  baseURL: "https://library-management-1-bhgm.onrender.com",
  headers: {
    "x-api-key": "mysecretkey"
  }
});

export default api;