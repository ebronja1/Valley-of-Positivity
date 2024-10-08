import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QuoteList from "../../Components/QuoteList/QuoteList";
import "./QuotesPage.css";

const QuotePage: React.FC = () => {
  useEffect(() => {
    localStorage.setItem('visitedQuotes', 'true');
    const startTime = Date.now();
    return () => {
      const endTime = Date.now();
      const timeSpent = endTime - startTime;
      localStorage.setItem('quoteTime', String(timeSpent));
    };
  }, []);
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");

  return (
    <div className="quotes-page">
      <h1>Quotes</h1>
      <QuoteList type={type} /> {/* Pass the selected type to QuoteList */}
    </div>
  );
};

export default QuotePage;






