import axios from 'axios';
import { VideoQueryObject } from '../Models/VideoModels';
import { VideoModel } from '../Models/VideoModels';

export const fetchVideos = async (queryObject?: VideoQueryObject): Promise<VideoModel[]> => {
  try {
    const response = await axios.get('http://localhost:5240/api/video', {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Videos:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};