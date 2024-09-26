// src/services/PhotoService.ts
import axios from 'axios';
import { PhotoQueryObject, PhotoModel } from '../Models/PhotoModels';

// Fetch photos (existing function)
export const fetchPhotos = async (queryObject?: PhotoQueryObject): Promise<PhotoModel[]> => {
  try {
    const response = await axios.get('http://localhost:5240/api/photo', {
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
    const response = await axios.post('http://localhost:5240/api/photo', photo);
    return response.data;
  } catch (error) {
    console.error('Error submitting Photo:', error);
    throw error;
  }
};
