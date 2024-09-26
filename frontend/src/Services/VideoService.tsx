// src/services/VideoService.ts
import axios from 'axios';
import { VideoQueryObject, VideoModel } from '../Models/VideoModels';

// Fetch videos (existing function)
export const fetchVideos = async (queryObject?: VideoQueryObject): Promise<VideoModel[]> => {
  try {
    const response = await axios.get('http://localhost:5240/api/video', {
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
    const response = await axios.post('http://localhost:5240/api/video', video);
    return response.data;
  } catch (error) {
    console.error('Error submitting Video:', error);
    throw error;
  }
};

export const deleteVideo = async (videoId: number): Promise<VideoModel> => {
  try {
    const response = await axios.delete(`http://localhost:5240/api/video/${videoId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting video:', error);
    throw error;
  }
};