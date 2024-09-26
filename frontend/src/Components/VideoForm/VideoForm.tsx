// src/components/VideoForm.tsx
import React, { useState } from 'react';
import { VideoModel, VideoType } from '../../Models/VideoModels';
import { submitVideo } from '../../Services/VideoService';
import { toast } from 'react-toastify';

const VideoForm: React.FC = () => {
    const [video, setVideo] = useState<VideoModel>({
        id: 0,
        title: '',
        videoUrl: '',
        type: VideoType.Landscape,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setVideo({ ...video, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newVideo = await submitVideo(video);
            if (newVideo) {
                toast.success('Video added successfully!');
                newVideo.title= '';
                newVideo.videoUrl = '';
                setVideo(newVideo);
            }
            console.log('Video submitted successfully:', newVideo);
        } catch (error) {
            console.error('Error submitting video:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Submit Video</h2>
            <input
                type="text"
                name="title"
                value={video.title}
                onChange={handleInputChange}
                placeholder="Enter video title"
                required
            />
            <input
                type="text"
                name="videoUrl"
                value={video.videoUrl}
                onChange={handleInputChange}
                placeholder="Video URL"
                required
            />
            <select
                name="type"
                value={video.type}
                onChange={handleInputChange}
            >
                {Object.values(VideoType).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <button type="submit">Submit Video</button>
        </form>
    );
};

export default VideoForm;
