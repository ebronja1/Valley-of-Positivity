import React, { useEffect, useState } from "react";
import { fetchVideos } from "../../Services/VideoService";
import { VideoModel, VideoQueryObject } from "../../Models/VideoModels";
import { v4 as uuidv4 } from "uuid";
import Video from "../Video/Video";
import "./VideoList.css";

interface VideoListProps {
  type?: any;  // Accept the `type` prop
}

const VideoList: React.FC<VideoListProps> = ({ type }) => {
  const [videos, setVideos] = useState<VideoModel[] | null>([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const query: VideoQueryObject = {};
        if (type) {
          query.type = type;  // Set the type in the query if it is passed
        }

        const videosData = await fetchVideos(query);
        setVideos(videosData);
      } catch (error) {
        setVideos(null);
        console.error("Error fetching videos", error);
      }
    };

    getVideos();
  }, [type]);  // Add `type` to the dependency array

  return (
    <div className="video-list">
      {videos ? (
        videos.map((video) => (
          <Video key={uuidv4()} video={video} />
        ))
      ) : (
        <p>No videos available</p>
      )}
    </div>
  );
};

export default VideoList;
