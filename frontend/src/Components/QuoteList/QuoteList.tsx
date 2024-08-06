// src/Components/QuoteList/QuoteList.tsx
import React, { useEffect, useState } from "react";
import { fetchQuotes } from "../../Services/QuoteService";
import { QuoteModel, QuoteQueryObject } from "../../Models/QuoteModels";
import { v4 as uuidv4 } from "uuid";
import Quote from "../Quote/Quote";

interface QuoteListProps {
  quoteQuery: QuoteQueryObject;
}

const QuoteList: React.FC<QuoteListProps> = ({ quoteQuery }) => {
  const [quotes, setQuotes] = useState<QuoteModel[]>([]);

  useEffect(() => {
    const getQuotes = async () => {
      try {
        const quotesData = await fetchQuotes(quoteQuery);
        setQuotes(quotesData);
      } catch (error) {
        console.error("Error fetching quotes", error);
      }
    };

    getQuotes();
  }, [quoteQuery]);

  return (
    <div>
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







