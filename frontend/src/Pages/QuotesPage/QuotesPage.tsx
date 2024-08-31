import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import QuoteList from "../../Components/QuoteList/QuoteList";
import { useAuth } from "../../Context/useAuth";

const QuotePage: React.FC = () => {
  const { recordAction } = useAuth();
  useEffect(() => {
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
    <div>
      <h1>Quotes</h1>
      <QuoteList type={type} /> {/* Pass the selected type to QuoteList */}
    </div>
  );
};

export default QuotePage;






