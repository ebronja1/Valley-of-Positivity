// src/Components/Video/Video.tsx
import React, { useState } from "react";
import "./Video.css";
import { useAuth } from "../../Context/useAuth"; // Importing user authentication hook
import { toast } from "react-toastify";
import { deleteVideo } from "../../Services/VideoService"; // Ensure this service exists and is correctly imported
import { VideoModel } from "../../Models/VideoModels"; // Import your Video model

interface VideoProps {
  video: VideoModel; // Define the appropriate type based on your API response
}

const Video: React.FC<VideoProps> = ({ video }) => {
  const { isAdmin } = useAuth(); // Assuming useAuth provides user info like role
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault(); // Prevent default behavior

    try {
      await deleteVideo(id);
      toast.success('Video deleted successfully!');
      // Optionally trigger a refresh or callback here to update the UI
    } catch (error) {
      console.error('Failed to delete video:', error);
      toast.error('Failed to delete video. Please try again.');
    }
    window.location.reload(); // Refreshing the page after deletion
  };

  // Extract the video ID from the URL
  const videoId = new URL(video.videoUrl).searchParams.get('v');

  return (
    <div>
      {/* Video Display */}
      <div className="video" onClick={toggleModal}>
        <h2>{video.title}</h2>
        {videoId ? (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={video.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Invalid video URL</p>
        )}
      </div>

      {/* Admin options (if the user is an admin) */}
      {isAdmin() && (
        <div className="video-admin-options">
          <button onClick={(event) => onDelete(event, video.id)}>Delete</button> {/* Prevent default behavior */}
        </div>
      )}

      {/* Modal for viewing the video */}
      {isModalOpen && (
        <div className="video-modal" onClick={toggleModal}>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            {videoId ? (
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Invalid video URL</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Video;
