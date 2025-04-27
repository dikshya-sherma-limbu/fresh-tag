// Base configuration for API services

// Base URL for your API (customize this for your environment)
const BASE_URL = "http://192.168.2.180:2025";

// API endpoints
export const API_ENDPOINTS = {
  // User related endpoints
  USERS: {
    BASE: `${BASE_URL}/api/users`,
    LOGIN: `${BASE_URL}/api/users/login`,
    REGISTER: `${BASE_URL}/api/users/register`,
    PROFILE: `${BASE_URL}/api/users/profile`,
    AUTH_TOKEN: `${BASE_URL}/api/users/authenticate-user`,
  },

  // Label related endpoints
  LABELS: {
    BASE: `${BASE_URL}/api/labels`,
    CREATE: `${BASE_URL}/api/labels/create-label`,
    GET_ALL: `${BASE_URL}/api/labels/all-labels`,
    GET_BY_FOOD: (foodName: string) =>
      `${BASE_URL}/api/labels/label/${foodName}`,
    DELETE: (foodName: string) => `${BASE_URL}/api/labels/label/${foodName}`,
  },
};
