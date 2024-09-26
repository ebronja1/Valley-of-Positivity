// src/Components/Photo/Photo.tsx
import React, { useState } from "react";
import "./Photo.css";
import { useAuth } from "../../Context/useAuth"; // Importing user authentication hook
import { toast } from "react-toastify";
import { deletePhoto } from "../../Services/PhotoService"; // Ensure this service exists and is correctly imported
import { PhotoModel } from "../../Models/PhotoModels"; // Import your Photo model

interface PhotoProps {
  photo: PhotoModel; // Define the appropriate type based on your API response
}

const Photo: React.FC<PhotoProps> = ({ photo }) => {
  const { isAdmin } = useAuth();  // Assuming useAuth provides user info like role
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault(); // Prevent default behavior

    try {
      await deletePhoto(id);
      toast.success('Photo deleted successfully!');
      // You might want to trigger a refresh or callback here to update the UI
    } catch (error) {
      console.error('Failed to delete photo:', error);
      toast.error('Failed to delete photo. Please try again.');
    }
    window.location.reload(); // Refreshing the page after deletion
  };

  return (
    <div>
      {/* Photo Display */}
      <div className="photo" onClick={toggleModal}>
        <h2>{photo.title}</h2>
        <img src={photo.imageUrl} alt={photo.title} />
      </div>

      {/* Admin options (if the user is an admin) */}
      {isAdmin() && (
        <div className="photo-admin-options">
          <button onClick={(event) => onDelete(event, photo.id)}>Delete</button> {/* Prevent default behavior */}
        </div>
      )}

      {/* Modal for viewing full photo */}
      {isModalOpen && (
        <div className="photo-modal" onClick={toggleModal}>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2 className="modal-photo-title">{photo.title}</h2>
            <img className="modal-photo-image" src={photo.imageUrl} alt={photo.title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Photo;

