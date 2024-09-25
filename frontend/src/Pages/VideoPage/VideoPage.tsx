import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoList from "../../Components/VideoList/VideoList";
import { useAuth } from "../../Context/useAuth";
import { VideoType } from "../../Models/VideoModels";
import "./VideoPage.css";

const VideoPage: React.FC = () => {
  const { actionData } = useAuth();
  const [mostClickedVideoType, setMostClickedVideoType] = useState<VideoType | null>(null);
    //Tracking time spent on the video page
  useEffect(() => {
    localStorage.setItem('visitedVideos', 'true');
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      localStorage.setItem('videoTime', String(timeSpent));
    };
  }, []);
  //Adjustig background color
  useEffect(() => {
    const videoClicks = actionData.filter((a) => a.elementClass === "video-type");

    const mostClickedVideo = videoClicks.reduce(
      (prev, current) => (prev.quantity > current.quantity ? prev : current),
      videoClicks[0]
    );

    if (mostClickedVideo) {
      setMostClickedVideoType(mostClickedVideo.action as VideoType);
    }
  }, [actionData]);
  const getBackgroundColorClass = () => {
    switch (mostClickedVideoType) {
      case VideoType.Landscape:
        return "landscape-color";
      case VideoType.Nature:
        return "nature-color";
      case VideoType.Travel:
        return "travel-color";
      case VideoType.Animals:
        return "animals-color";
      case VideoType.Inspirational:
        return "inspirational-color";
      case VideoType.Abstract:
        return "abstract-color";
      case VideoType.Other:
        return "other-color";
      default:
        return "";
    }
  };
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <div className={`video-page ${getBackgroundColorClass()}`}>
      <h1>Videos</h1>
      <VideoList type={type} /> {/* Pass the selected type to VideoList */}
    </div>
  );
};

export default VideoPage;
