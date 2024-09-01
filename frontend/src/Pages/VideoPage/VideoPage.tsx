import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import VideoList from "../../Components/VideoList/VideoList";

const VideoPage: React.FC = () => {
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      localStorage.setItem('videoTime', String(timeSpent));
    };
  }, []);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <div>
      <h1>Videos</h1>
      <VideoList type={type} /> {/* Pass the selected type to VideoList */}
    </div>
  );
};

export default VideoPage;
