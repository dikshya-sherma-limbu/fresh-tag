import axios from "axios";
import { API_ENDPOINTS } from "../api-config";
import { labelDataType } from "@/types/label";
import apiClient from "../apiClient";

// Create labels
export const createLabel = async (labelData: labelDataType) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.LABELS.CREATE,
      labelData
    );
    if (response.status !== 201) {
      console.error("Response error:", response);
      throw new Error("Failed to create label");
    }
    console.log("Label created successfully:", response.data);
    // Handle the response as needed
    return response.data;
  } catch (error) {
    console.error("Error creating label:", error);
    throw error;
  }
};

// Get all labels
export const getAllLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.GET_ALL);
    if (response.status !== 200) {
      console.error("Response error:", response);
      throw new Error("Failed to fetch labels");
    }
    console.log("Labels fetched successfully:", response.data);
    // Handle the response as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching labels:", error);
    throw error;
  }
};

// Get all expired labels
export const getExpiredLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.EXPIRED_LABELS);
    if (response.status !== 200) {
      console.error("Response error:", response);
      throw new Error("Failed to fetch expired labels");
    }
    console.log("Expired labels fetched successfully:", response.data);
    // Handle the response as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching expired labels:", error);
    throw error;
  }
};

// Get all active labels
export const getActiveLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.ACTIVE_LABELS);
    if (response.status !== 200) {
      console.error("Response error:", response);
      throw new Error("Failed to fetch active labels");
    }
    console.log("Active labels fetched successfully:", response.data);
    // Handle the response as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching active labels:", error);
    throw error;
  }
};
// get the current date labels as the default labels
export const getCurrentDateLabels = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.LABELS.CURRENT_DATE_LABELS
    );
    if (response.status !== 200) {
      console.error("Response error:", response);
      throw new Error("Failed to fetch current date labels");
    }
    console.log("Current date labels fetched successfully:", response.data);
    // Handle the response as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching current date labels:", error);
    throw error;
  }
};
//get the recent labels
export const getRecentLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.RECENT_LABELS);
    if (response.status !== 200) {
      console.error("Response error:", response);
      throw new Error("Failed to fetch recent labels");
    }
    console.log("Recent labels fetched successfully:", response.data);
    // Handle the response as needed
    return response.data;
  } catch (error) {
    console.error("Error fetching recent labels:", error);
    throw error;
  }
};
