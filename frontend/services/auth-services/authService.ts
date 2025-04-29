import axios from "axios";
import { API_ENDPOINTS } from "../api-config";
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

// Remove token and user data on logout - this is called in the logout function
export const removeAuthData = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  } catch (error) {
    console.error("Error removing auth data:", error);
    throw error;
  }
};

// Login function
export const login = async (credentials: LoginCredentials) => {
  try {
    const response = await axios.post(API_ENDPOINTS.USERS.LOGIN, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status !== 200) {
      console.error("Response error:", response);
    }
    const data = response.data;

    if (data.token) {
      await storeToken(data.token); // Store the token securely
    } else {
      console.error("No token received in response:", data);
    }
    console.log("resonse:", response.data);
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
  if (!token) {
    console.log("No token found, user is not authenticated.");
    return false;
  }
  console.log("Checking authentication, token:", token);
  try {
    const response = await axios.get(API_ENDPOINTS.USERS.AUTH_TOKEN, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status !== 200) {
      console.error("Response error:", response);
      return false; // User is not authenticated
    } else {
      return true; // User is authenticated
    }
  } catch (error) {
    return false;
  }
};
