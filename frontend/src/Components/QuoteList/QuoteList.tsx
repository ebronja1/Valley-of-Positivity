import React, { useEffect, useState } from "react";
import { fetchQuotes } from "../../Services/QuoteService";
import { QuoteModel, QuoteQueryObject } from "../../Models/QuoteModels";
import { v4 as uuidv4 } from "uuid";
import Quote from "../Quote/Quote";
import "./QuoteList.css";

interface QuoteListProps {
  type?: any;  // Accept the `type` prop
}

const QuoteList: React.FC<QuoteListProps> = ({ type }) => {
  const [quotes, setQuotes] = useState<QuoteModel[]>([]);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const query: QuoteQueryObject = {};
        if (type) {
          query.type = type;  // Set the type in the query if it is passed
        }
        
        const quotesData = await fetchQuotes(query);
        setQuotes(quotesData);
      } catch (error) {
        console.error("Error fetching quotes", error);
      }
    };

    getQuotes();
  }, [type]);  // Add `type` to the dependency array

  return (
    <div className="quote-list">
      {quotes.length > 0 ? (
        quotes.map((quote) => (
          <Quote key={uuidv4()} quote={quote} />
        ))
      ) : (
        <p>No quotes available</p>
      )}
    </div>
  );
};

export default QuoteList;
