import React, { SyntheticEvent } from "react";
import Card from "../Card/Card";
import { v4 as uuidv4 } from "uuid";
import "./CardList.css";

interface Props {
  searchResults: any[]; // Update this type based on your actual search result structure
  onPortfolioCreate: (e: SyntheticEvent) => void;
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <div className="card-list">
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol} // Adjust based on your actual data structure
              key={uuidv4()}
              searchResult={result}
              onPortfolioCreate={onPortfolioCreate}
            />
          );
        })
      ) : (
        <p className="no-results">No results!</p>
      )}
    </div>
  );
};

export default CardList;
