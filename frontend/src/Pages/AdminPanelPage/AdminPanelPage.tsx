// src/components/AdminPanel.tsx
import React from 'react';
import QuoteForm from '../../Components/QuoteForm/QuoteForm';
import PhotoForm from '../../Components/PhotoForm/PhotoForm';
import VideoForm from '../../Components/VideoForm/VideoForm';
import './AdminPanel.css';

const AdminPanelPage: React.FC = () => {
    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            <QuoteForm />
            <PhotoForm />
            <VideoForm />
        </div>
    );
};

export default AdminPanelPage;
