// src/routes.tsx
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import LoginPage from '../Pages/LoginPage/LoginPage';
import RegisterPage from '../Pages/RegisterPage/RegisterPage';
import HomePage from '../Pages/HomePage/HomePage'; // Home page
import QuotesPage from '../Pages/QuotesPage/QuotesPage'; // Quotes page
import PhotosPage from '../Pages/PhotosPage/PhotosPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> }, // Main route
      { path: 'login', element: <LoginPage /> }, // Login route
      { path: 'register', element: <RegisterPage /> }, // Register route
      { path: 'quotes', element: <QuotesPage /> }, // Quotes route
      { path: 'photos', element: <PhotosPage /> }, // Photos route
      // Add other routes if necessary
    ],
  },
]);
