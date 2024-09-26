import React, { useEffect, useState } from "react";
import { fetchPhotos } from "../../Services/PhotoService";
import { PhotoModel, PhotoQueryObject } from "../../Models/PhotoModels";
import { v4 as uuidv4 } from "uuid";
import Photo from "../Photo/Photo";
import "./PhotoList.css";

interface PhotoListProps {
  type?: any;  // Accept the `type` prop
}

const PhotoList: React.FC<PhotoListProps> = ({ type }) => {
  const [photos, setPhotos] = useState<PhotoModel[] | null>([]);

  useEffect(() => {
    const getPhotos = async () => {
      try {
        const query: PhotoQueryObject = {};
        if (type) {
          query.type = type;  // Set the type in the query if it is passed
        }

        const photosData = await fetchPhotos(query);
        setPhotos(photosData);
      } catch (error) {
        setPhotos(null);
        console.error("Error fetching photos", error);
      }
    };

    getPhotos();
  }, [type]);  // Add `type` to the dependency array

  return (
    <div className="photo-list">
      {photos ? (
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
