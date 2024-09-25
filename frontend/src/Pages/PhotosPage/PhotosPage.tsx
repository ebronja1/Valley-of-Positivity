import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PhotoList from "../../Components/PhotoList/PhotoList";
import { useAuth } from "../../Context/useAuth";
import { PhotoType } from "../../Models/PhotoModels";
import "./PhotosPage.css";

const PhotoPage: React.FC = () => {
  const { actionData } = useAuth();
  const [mostClickedPhotoType, setMostClickedPhotoType] = useState<PhotoType | null>(null);
  //Tracking time spent on the photos page
  useEffect(() => {
    localStorage.setItem('visitedPhotos', 'true');
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      localStorage.setItem('photoTime', String(timeSpent));
    };
  }, []);
  //Adjustig background color
  useEffect(() => {
    const photoClicks = actionData.filter((a) => a.elementClass === "photo-type");

    const mostClickedPhoto = photoClicks.reduce(
      (prev, current) => (prev.quantity > current.quantity ? prev : current),
      photoClicks[0]
    );

    if (mostClickedPhoto) {
      setMostClickedPhotoType(mostClickedPhoto.action as PhotoType);
    }
  }, [actionData]);

  const getBackgroundColorClass = () => {
    switch (mostClickedPhotoType) {
      case PhotoType.Landscape:
        return "landscape-color";
      case PhotoType.Nature:
        return "nature-color";
      case PhotoType.Travel:
        return "travel-color";
      case PhotoType.Animals:
        return "animals-color";
      case PhotoType.Inspirational:
        return "inspirational-color";
      case PhotoType.Abstract:
        return "abstract-color";
      case PhotoType.Other:
        return "other-color";
      default:
        return "";
    }
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <div className={`photo-page ${getBackgroundColorClass()}`}>
      <h1>Photos</h1>
      <PhotoList type={type} /> {/* Pass the selected type to PhotoList */}
    </div>
  );
};

export default PhotoPage;

