import React, { useState } from "react";
import Menu from "../../Components/Menu/Menu";
import QuoteList from "../../Components/QuoteList/QuoteList";
import { QuoteQueryObject } from "../../Models/QuoteModels";
import { PhotoQueryObject } from "../../Models/PhotoModels";
import PhotoList from "../../Components/PhotoList/PhotoList";

const HomePage: React.FC = () => {
  const [quoteQuery, setQuoteQuery] = useState<QuoteQueryObject>({});
  const [showQuotes, setShowQuotes] = useState(false);
  
  const [photoQuery, setPhotoQuery] = useState<PhotoQueryObject>({});
  const [showPhotos, setShowPhotos] = useState(false);

  const handleQuoteTypeChange = (quoteQuery: QuoteQueryObject) => {
    setQuoteQuery(quoteQuery);
    setShowQuotes(true); // Show quotes when the type is changed
  };
  const handlePhotoTypeChange = (photoQuery: PhotoQueryObject) => {
    setPhotoQuery(photoQuery);
    setShowPhotos(true); // Show quotes when the type is changed
  };

  const handleMenuClick = (menuItem: string) => {
    if (menuItem === "Quotes") {
      setShowQuotes(true);
      setShowPhotos(false);
    } else if (menuItem === "Photos") {
      setShowPhotos(true);
      setShowQuotes(false);
    } else {
      setShowPhotos(false);
      setShowQuotes(false);
    }
  };

  return (
    <>
      <Menu
        onQuoteTypeChange={handleQuoteTypeChange}
        onPhotoTypeChange={handlePhotoTypeChange}
        onMenuClick={handleMenuClick} // Add this prop to handle menu clicks
      />
      {showQuotes && <QuoteList quoteQuery={quoteQuery} />}
      {showPhotos && <PhotoList photoQuery={photoQuery} />}
    </>
  );
};

export default HomePage;







