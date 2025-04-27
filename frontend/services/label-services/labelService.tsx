import axios from "axios";
import { API_ENDPOINTS } from "../api-config";
import { labelDataType } from "@/types/label";
import apiClient from "../apiClient";
import { expiryLabelType } from "@/types/expiryLabel";
export const createLabel = async (labelData: labelDataType) => {
  try {
    const response = await apiClient.post(
      API_ENDPOINTS.LABELS.CREATE,
      labelData
    );
    if (response.status !== 200) {
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

  }catch(error) {
    console.error("Error fetching labels:", error);
    throw error;
  }

}