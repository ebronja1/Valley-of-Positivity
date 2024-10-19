// src/services/VideoService.ts
import axios from 'axios';
import { VideoQueryObject, VideoModel } from '../Models/VideoModels';

// Get the API base URL from the environment variable, or default to localhost if not set
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5240/api';

// Fetch videos (existing function)
export const fetchVideos = async (queryObject?: VideoQueryObject): Promise<VideoModel[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/video`, {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Videos:', error);
    throw error;
  }
};

// Submit new video
export const submitVideo = async (video: VideoModel): Promise<VideoModel> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/video`, video);
    return response.data;
  } catch (error) {
    console.error('Error submitting Video:', error);
    throw error;
  }
};

// Delete a video
export const deleteVideo = async (videoId: number): Promise<VideoModel> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/video/${videoId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};
