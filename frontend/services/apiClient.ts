import axios from "axios";
import { getToken } from "./auth-services/authService";

const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json", // Set default content type to JSON
  },
});

// Add a request interceptor to include the token in all API requests
apiClient.interceptors.request.use(
  async (config) => {
    const token = await getToken(); // Get the token from storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

export default apiClient;
// This is a base configuration for API services using Axios. It sets up a default base URL and headers for all requests, and includes an interceptor to automatically attach the authentication token to each request. This way, you don't have to manually add the token to every API call, making your code cleaner and more maintainable.
