import React, { useState, useEffect } from 'react';
import { fetchQuotes } from '../../Services/QuoteService';
import { fetchPhotos } from '../../Services/PhotoService';
import { fetchVideos } from '../../Services/VideoService';
import './HomePage.css';
import Quote from '../../Components/Quote/Quote';
import Photo from '../../Components/Photo/Photo';
import Video from '../../Components/Video/Video';
import { QuoteModel } from '../../Models/QuoteModels';
import { PhotoModel } from '../../Models/PhotoModels';
import { VideoModel } from '../../Models/VideoModels';

const HomePage: React.FC = () => {
  const [randomQuote, setRandomQuote] = useState<QuoteModel | null>(null);
  const [randomPhoto, setRandomPhoto] = useState<PhotoModel | null>(null);
  const [randomVideo, setRandomVideo] = useState<VideoModel | null>(null);

  useEffect(() => {
    // Fetch stored times from localStorage
    const quoteTimeStr = localStorage.getItem('quoteTime');
    const photoTimeStr = localStorage.getItem('photoTime');
    const videoTimeStr = localStorage.getItem('videoTime');
    const quoteTime = quoteTimeStr ? parseInt(quoteTimeStr, 10) : 0;
    const photoTime = photoTimeStr ? parseInt(photoTimeStr, 10) : 0;
    const videoTime = videoTimeStr ? parseInt(videoTimeStr, 10) : 0;

    // Determine button sizes based on time comparison
    const times = [
      { type: 'quote', time: quoteTime },
      { type: 'photo', time: photoTime },
      { type: 'video', time: videoTime }
    ];

    // Sort times in descending order
    times.sort((a, b) => b.time - a.time);

    // Assign sizes based on the rank of time
    const sizes: { [key: string]: string } = {
      quote: 'small',
      photo: 'small',
      video: 'small'
    };

    if (times.length > 0) sizes[times[0].type] = 'large'; // Largest time
    if (times.length > 1) sizes[times[1].type] = 'medium'; // Second largest time
    if (times.length > 2) sizes[times[2].type] = 'small';  // Smallest time

    localStorage.setItem('quoteButtonSize', sizes.quote || 'small');
    localStorage.setItem('photoButtonSize', sizes.photo || 'small');
    localStorage.setItem('videoButtonSize', sizes.video || 'small');
  }, []);

  const handleQuoteMe = async () => {
    try {
      const quotes = await fetchQuotes();
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
      setRandomPhoto(null); // Clear photo and video when showing quote
      setRandomVideo(null);
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  };

  const handlePhotoMe = async () => {
    try {
      const photos = await fetchPhotos();
      const randomIndex = Math.floor(Math.random() * photos.length);
      setRandomPhoto(photos[randomIndex]);
      setRandomQuote(null); // Clear quote and video when showing photo
      setRandomVideo(null);
    } catch (error) {
      console.error('Error fetching photo:', error);
    }
  };

  const handleVideoMe = async () => {
    try {
      const videos = await fetchVideos();
      const randomIndex = Math.floor(Math.random() * videos.length);
      setRandomVideo(videos[randomIndex]);
      setRandomQuote(null); // Clear quote and photo when showing video
      setRandomPhoto(null);
    } catch (error) {
      console.error('Error fetching video:', error);
    }
  };

  // Get button sizes from local storage
  const quoteButtonSize = localStorage.getItem('quoteButtonSize') || 'small';
  const photoButtonSize = localStorage.getItem('photoButtonSize') || 'small';
  const videoButtonSize = localStorage.getItem('videoButtonSize') || 'small';

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
        <button
          className={`video-me-button ${videoButtonSize}`}
          onClick={handleVideoMe}
        >
          VideoMe
        </button>
      </div>
      <div className="content-container">
        {randomQuote && <Quote quote={randomQuote} />}
        {randomPhoto && <Photo photo={randomPhoto} />}
        {randomVideo && <Video video={randomVideo} />}
      </div>
    </div>
  );
};

export default HomePage;
