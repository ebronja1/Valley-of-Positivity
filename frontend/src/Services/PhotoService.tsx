// src/services/PhotoService.ts
import axios from 'axios';
import { PhotoQueryObject, PhotoModel } from '../Models/PhotoModels';

// Get the API base URL from the environment variable, or default to localhost if not set
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5240/api';

// Fetch photos (existing function)
export const fetchPhotos = async (queryObject?: PhotoQueryObject): Promise<PhotoModel[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/photo`, {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Photos:', error);
    throw error;
  }
};

// Submit new photo
export const submitPhoto = async (photo: PhotoModel): Promise<PhotoModel> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/photo`, photo);
    return response.data;
  } catch (error) {
    console.error('Error submitting Photo:', error);
    throw error;
  }
};

// Delete photo
export const deletePhoto = async (photoId: number): Promise<PhotoModel> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/photo/${photoId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting photo:', error);
    throw error;
  }
};
