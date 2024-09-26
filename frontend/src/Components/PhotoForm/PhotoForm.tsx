// src/components/PhotoForm.tsx
import React, { useState } from 'react';
import { PhotoModel, PhotoType } from '../../Models/PhotoModels';
import { submitPhoto } from '../../Services/PhotoService';
import { toast } from 'react-toastify';

const PhotoForm: React.FC = () => {
    const [photo, setPhoto] = useState<PhotoModel>({
        id: 0,
        title: '',
        imageUrl: '',
        type: PhotoType.Landscape,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPhoto({ ...photo, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newPhoto = await submitPhoto(photo);
            if (photo) {
                toast.success('Photo added successfully!');
                photo.imageUrl = '';
                photo.title = '';
                setPhoto(photo);
            }
            console.log('Photo submitted successfully:', newPhoto);
        } catch (error) {
            console.error('Error submitting photo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Submit Photo</h2>
            <input
                type="text"
                name="title"
                value={photo.title}
                onChange={handleInputChange}
                placeholder="Enter photo title"
                required
            />
            <input
                type="text"
                name="imageUrl"
                value={photo.imageUrl}
                onChange={handleInputChange}
                placeholder="Image URL"
                required
            />
            <select
                name="type"
                value={photo.type}
                onChange={handleInputChange}
            >
                {Object.values(PhotoType).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <button type="submit">Submit Photo</button>
        </form>
    );
};

export default PhotoForm;
