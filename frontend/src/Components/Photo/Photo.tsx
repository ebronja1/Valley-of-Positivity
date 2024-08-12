// src/Components/Photo/Photo.tsx
import React from "react";
import "./Photo.css";

interface PhotoProps {
  photo: {
    title: string;
    imageUrl: string;
  }; // Define the appropriate type based on your API response
}

const Photo: React.FC<PhotoProps> = ({ photo }) => {
  return (
    <div className="photo">
      <h2>{photo.title}</h2>
      <img src={photo.imageUrl} alt={photo.title} />
    </div>
  );
};

export default Photo;
