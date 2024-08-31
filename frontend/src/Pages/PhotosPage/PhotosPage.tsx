import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PhotoList from "../../Components/PhotoList/PhotoList";

const PhotoPage: React.FC = () => {
  useEffect(() => {
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      localStorage.setItem('photoTime', String(timeSpent));
    };
  }, []);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <div>
      <h1>Photos</h1>
      <PhotoList type={type} /> {/* Pass the selected type to PhotoList */}
    </div>
  );
};

export default PhotoPage;

