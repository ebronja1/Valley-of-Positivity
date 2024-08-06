import React, { SyntheticEvent } from "react";
import "./Card.css"; // Create and use a separate CSS file for Card styling

interface Props {
  id: string;
  searchResult: any;
  onPortfolioCreate: (e: SyntheticEvent) => void; // Update this type based on your actual search result structure
}

const Card: React.FC<Props> = ({ id, searchResult, onPortfolioCreate }) => {
  return (
    <div className="card">
      <h3>{searchResult.title}</h3> {/* Adjust based on your actual data */}
      <p>{searchResult.description}</p> {/* Adjust based on your actual data */}
    </div>
  );
};

export default Card;
