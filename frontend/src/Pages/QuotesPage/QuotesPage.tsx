import React from 'react';
import { useParams } from 'react-router-dom';
import QuoteList from '../../Components/QuoteList/QuoteList';
import { QuoteTypeString } from '../../Models/QuoteModels';
import "./QuotesPage.css";

const QuotePage: React.FC = () => {
  const { type } = useParams<{ type?: QuoteTypeString }>();

  const quoteQuery = {
    type: type ? (type as QuoteTypeString) : undefined
  };

  return (
    <div className='quote-page'>
      <h1>Quotes</h1>
      <QuoteList quoteQuery={quoteQuery} />
    </div>
  );
};

export default QuotePage;





