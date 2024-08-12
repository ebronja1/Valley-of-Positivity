// src/Components/PhotoList/PhotoList.tsx
import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../../Services/PhotoService";
import { PhotoModel, PhotoQueryObject } from "../../Models/PhotoModels";
import { v4 as uuidv4 } from "uuid";
import Photo from "../Photo/Photo";
import "./PhotoList.css"

interface PhotoListProps {
  photoQuery: PhotoQueryObject;
}

const PhotoList: React.FC<PhotoListProps> = ({ photoQuery }) => {
  const [photos, setPhotos] = useState<PhotoModel[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const photosData = await fetchPhotos(photoQuery);
        setPhotos(photosData);
      } catch (error) {
        console.error("Error fetching Photos", error);
      }
    };

    getPhotos();
  }, [photoQuery]);

  return (
    <div className="photo-list">
      {photos.length > 0 ? (
        photos.map((photo) => (
          <Photo key={uuidv4()} photo={photo} />
        ))
      ) : (
        <p>No photos available</p>
      )}
    </div>
  );
};

export default PhotoList;