import axios from 'axios';
import { DiaryNote, DiaryModel, DiaryNotePost } from '../Models/DiaryModels';
import { number } from 'yup';

// API base URL
const API_BASE_URL = 'http://localhost:5240/api';

// Fetch the user's diary
export const fetchUserDiary = async (): Promise<DiaryModel | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diary/user`, {
      withCredentials: true, // Ensure credentials (like cookies) are sent with the request
    });
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return null; // No diary found for the user
    }
    throw error;
  }
};

// Create a new diary
export const createUserDiary = async (title: string): Promise<DiaryModel> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/diary`, { title }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update the diary title
export const updateUserDiary = async (diaryId: number, title: string): Promise<DiaryModel> => {
  try {
    const response = await axios.put(`${API_BASE_URL}/diary/${diaryId}`, { title }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Fetch diary notes by diary title
export const fetchDiaryNotes = async (id: number): Promise<DiaryModel> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/diary/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};


// Add a diary note to a specific diary
export const addDiaryNote = async (note: DiaryNotePost): Promise<DiaryNote> => {
  try {
    const response = await axios.post<DiaryNote>(`http://localhost:5240/api/diarynote/${note.diaryId}`, note, {
      headers: {
        // add any required headers here
      },
    });
    return response.data; // Ensure this returns the newly created DiaryNote object
  } catch (error) {
    console.error("Error adding diary note:", error);
    throw error;
  }
};
