// src/Pages/HomePage/HomePage.tsx
import React, { useState, useEffect } from 'react';
import { fetchQuotes } from '../../Services/QuoteService';
import { fetchPhotos } from '../../Services/PhotoService';
import './HomePage.css';
import Quote from '../../Components/Quote/Quote';
import Photo from '../../Components/Photo/Photo';
import { QuoteModel } from '../../Models/QuoteModels';
import { PhotoModel } from '../../Models/PhotoModels';

const HomePage: React.FC = () => {
  const [randomQuote, setRandomQuote] = useState<QuoteModel | null>(null);
  const [randomPhoto, setRandomPhoto] = useState<PhotoModel | null>(null);

  useEffect(() => {
    // Fetch stored times from localStorage
    const quoteTimeStr = localStorage.getItem('quoteTime');
    const photoTimeStr = localStorage.getItem('photoTime');
    const quoteTime = quoteTimeStr ? parseInt(quoteTimeStr, 10) : 0;
    const photoTime = photoTimeStr ? parseInt(photoTimeStr, 10) : 0;

    // Determine button sizes based on time comparison
    const quoteButtonSize = quoteTime > photoTime ? 'large' : 'medium';
    const photoButtonSize = photoTime > quoteTime ? 'large' : 'medium';

    localStorage.setItem('quoteButtonSize', quoteButtonSize);
    localStorage.setItem('photoButtonSize', photoButtonSize);
  }, []);

  const handleQuoteMe = async () => {
    try {
      const quotes = await fetchQuotes();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
      setRandomPhoto(null); // Clear photo when showing quote
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handlePhotoMe = async () => {
    try {
      const photos = await fetchPhotos();
      const randomIndex = Math.floor(Math.random() * photos.length);
      setRandomPhoto(photos[randomIndex]);
      setRandomQuote(null); // Clear quote when showing photo
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  // Get button sizes from local storage
  const quoteButtonSize = localStorage.getItem('quoteButtonSize') || 'medium';
  const photoButtonSize = localStorage.getItem('photoButtonSize') || 'medium';

  return (
    <div className="home-page">
      <div className="buttons-container">
        <button
          className={`quote-me-button ${quoteButtonSize}`}
          onClick={handleQuoteMe}
        >
          QuoteMe
        </button>
        <button
          className={`photo-me-button ${photoButtonSize}`}
          onClick={handlePhotoMe}
        >
          PhotoMe
        </button>
      </div>
      <div className="content-container">
        {randomQuote && <Quote quote={randomQuote}/>}
        {randomPhoto && <Photo photo={randomPhoto}/>}
      </div>
    </div>
  );
};

export default HomePage;

