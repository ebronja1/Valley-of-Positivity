// src/Components/Video/Video.tsx
import React from "react";
import "./Video.css";

interface VideoProps {
  video: {
    title: string;
    videoUrl: string; // Expect this to be the YouTube video URL
  };
}

const Video: React.FC<VideoProps> = ({ video }) => {
  // Extract the video ID from the URL
  const videoId = new URL(video.videoUrl).searchParams.get('v');

  return (
    <div className="video">
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
  );
};

export default Video;

