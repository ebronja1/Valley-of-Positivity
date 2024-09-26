// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App'; // Import the App component
import Layout from '../Components/Layout/Layout'; // Adjust the path as needed
import HomePage from '../Pages/HomePage/HomePage';
import QuotesPage from '../Pages/QuotesPage/QuotesPage';
import PhotosPage from '../Pages/PhotosPage/PhotosPage';
import DiaryPage from '../Pages/DiaryPage/DiaryPage';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import VideoPage from '../Pages/VideoPage/VideoPage';
import AdminPanelPage from '../Pages/AdminPanelPage/AdminPanelPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // Wrapping App component with all providers
    children: [
      {
        path: '/',
        element: <Layout />, // Wrapping Layout component for main routes
        children: [
          { path: '/', element: <HomePage /> }, // Main home route
          { path: 'quotes', element: <QuotesPage /> }, // Quotes page
          { path: 'photos', element: <PhotosPage /> }, // Photos page
          { path: 'diary', element: <DiaryPage /> }, // Diary page
          { path: 'videos', element: <VideoPage /> }, //Video page
          { path: 'admin-panel', element: <AdminPanelPage /> } //Video page
        ],
      },
      { path: '/login', element: <LoginPage /> }, // Login route outside Layout
      { path: '/register', element: <RegisterPage /> }, // Register route outside Layout
    ],
  },
]);
