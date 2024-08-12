import axios from 'axios';
import { PhotoQueryObject } from '../Models/PhotoModels';
import { PhotoModel } from '../Models/PhotoModels';

export const fetchPhotos = async (queryObject?: PhotoQueryObject): Promise<PhotoModel[]> => {
  try {
    const response = await axios.get('http://localhost:5240/api/photo', {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Photos:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};