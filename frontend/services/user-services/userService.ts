import { UserDetails } from "@/types/User";
import { API_ENDPOINTS } from "@/services/api-config";
import axios from "axios";
import apiClient from "../apiClient";

// Get user profile
export const getUserDetails = async () => {
  try {
    const response = await apiClient.get<UserDetails>(
      API_ENDPOINTS.USERS.USER_DETAILS,
      {
        headers: { "constent-type": "application/json" },
      }
    );
    if (response.status !== 200) {
      console.error("Response error:", response);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
