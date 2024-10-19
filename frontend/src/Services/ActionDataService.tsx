// src/Services/ActionDataService.ts

import axios from "axios";
import { ActionData } from "../Models/ActionDataModels";

// Get the API base URL from the environment variable, or default to localhost if not set
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5240/api';

export const saveActions = async (action: ActionData): Promise<void> => {
  try {
    await axios.post(`${API_BASE_URL}/actiondata`, action, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error saving actions:", error);
    throw error;
  }
};

export const fetchUserActions = async (): Promise<ActionData[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/actiondata`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user actions:", error);
    throw error;
  }
};
