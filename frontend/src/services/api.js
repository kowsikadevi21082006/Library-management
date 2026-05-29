import axios from "axios";

const api = axios.create({
  baseURL: "https://library-management-2-bfke.onrender.com",
  timeout: 15000,
  headers: {
    "x-api-key": "mysecretkey"
  }
});

export const getApiErrorMessage = (error, fallbackMessage = "Something went wrong.") => {
  if (error.code === "ECONNABORTED") {
    return "Backend unavailable. The request timed out.";
  }

  if (!error.response) {
    return "Network error. Please check the backend connection.";
  }

  return error.response.data?.error || error.response.data?.message || fallbackMessage;
};

export default api;
