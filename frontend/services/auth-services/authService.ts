import axios from "axios";
import { API_ENDPOINTS } from "./api-config";
import * as SecureStore from "expo-secure-store";

// Token storage keys
const TOKEN_KEY = "user_token";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthResponse {
  token: string;
}

// Store token securely
export const storeToken = async (token: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  } catch (error) {
    console.error("Error storing token:", error);
    throw error;
  }
};

// Get stored token
export const getToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
// Remove token and user data on logout
export const removeAuthData = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing auth data:", error);
    throw error;
  }
};

export const login = async (credentials: LoginCredentials) => {
  try {
    console.log("Login attempt with credentials:", credentials);
    const response = await axios.post(
      "http://192.168.2.180:2025/api/users/login",
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      console.error("Response:", response);
    }

    const data = response.data;
    console.log("Login response data:", data);

    if (data.token) {
      await storeToken(data.token); // Store the token securely
    } else {
      console.error("No token received in response:", data);
    }

    return data;
  } catch (error) {
    console.error("Login error:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  return !!token;
};

// // Create axios instance with auth header
// export const createAuthenticatedAxiosInstance = async () => {
//   const token = await getToken();

//   return axios.create({
//     baseURL: API_ENDPOINTS.USERS.BASE,
//     timeout: 10000,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   });
// };
