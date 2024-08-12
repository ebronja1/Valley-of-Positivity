import React from 'react';
import { useParams } from 'react-router-dom';
import PhotoList from '../../Components/PhotoList/PhotoList';
import { PhotoTypeString } from '../../Models/PhotoModels';
import "./PhotosPage.css"

const PhotoPage: React.FC = () => {
  const { type } = useParams<{ type?: PhotoTypeString }>();

  const photoQuery = {
    type: type ? (type as PhotoTypeString) : undefined
  };

  return (
    <div className='photo-page'>
      <h1>Photos</h1>
      <PhotoList photoQuery={photoQuery} />
    </div>
  );
};

export default PhotoPage;
