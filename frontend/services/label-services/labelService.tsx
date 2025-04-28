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
    return response.data;
  } catch (error) {
    console.error("Service Error in createLabel:", error);
    return {
      success: false,
      message: "Network error while creating label",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Get all labels
export const getAllLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.GET_ALL);
    return response.data;
  } catch (error) {
    console.error("Service error in getAllLabels:", error);
    return {
      success: false,
      message: "Network error while fetching labels",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Get all expired labels
export const getExpiredLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.EXPIRED_LABELS);
    return response.data;
  } catch (error) {
    console.error("Service error in getExpiredLabels:", error);
    return {
      success: false,
      message: "Network error while fetching expired labels",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// Get all active labels
export const getActiveLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.ACTIVE_LABELS);
    return response.data;
  } catch (error) {
    console.error("Service error in getActiveLabels:", error);
    return {
      success: false,
      message: "Network error while fetching active labels",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

// get the current date labels as the default labels
export const getCurrentDateLabels = async () => {
  try {
    const response = await apiClient.get(
      API_ENDPOINTS.LABELS.CURRENT_DATE_LABELS
    );
    return response.data;
  } catch (error) {
    console.error("Service Error in getCurrentDateLabels:", error);
    return {
      success: false,
      message: "Network error while fetching labels",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

//get the recent labels
export const getRecentLabels = async () => {
  try {
    const response = await apiClient.get(API_ENDPOINTS.LABELS.RECENT_LABELS);
    return response.data;
  } catch (error) {
    console.error("Service Error in getRecentLabels:", error);
    return {
      success: false,
      message: "Network error while fetching recent labels",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
