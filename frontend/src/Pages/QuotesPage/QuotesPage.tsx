import React from 'react';
import { useParams } from 'react-router-dom';
import QuoteList from '../../Components/QuoteList/QuoteList';
import { QuoteTypeString } from '../../Models/QuoteModels';

const QuotePage: React.FC = () => {
  const { type } = useParams<{ type?: QuoteTypeString }>();

  const quoteQuery = {
    type: type ? (type as QuoteTypeString) : undefined
  };

  return (
    <div>
      <h1>Quotes</h1>
      <QuoteList quoteQuery={quoteQuery} />
    </div>
  );
};

export default QuotePage;





