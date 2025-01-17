import axios from "axios";
import { BASE_TIMEOUT, BASE_URL } from "../constants";

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: BASE_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptors for request/response handling
apiClient.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default apiClient;
