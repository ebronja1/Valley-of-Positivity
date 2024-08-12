// src/Components/Quote/Quote.tsx
import React from "react";
import "./Quote.css";

interface QuoteProps {
  quote: any; // Define the appropriate type based on your API response
}

const Quote: React.FC<QuoteProps> = ({ quote }) => {
  return (
    <div className="quote">
      <p>{quote.text}</p>
      <p>{quote.author}</p>
    </div>
  );
};

export default Quote;

