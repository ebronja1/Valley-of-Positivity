import React from "react";
import { useLocation } from "react-router-dom";
import QuoteList from "../../Components/QuoteList/QuoteList";

const QuotePage: React.FC = () => {
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






