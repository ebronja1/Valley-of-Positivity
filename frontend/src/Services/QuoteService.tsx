// src/services/QuoteService.ts
import axios from 'axios';
import { QuoteQueryObject, QuoteModel } from '../Models/QuoteModels';

// Fetch quotes (existing function)
export const fetchQuotes = async (queryObject?: QuoteQueryObject): Promise<QuoteModel[]> => {
  try {
    const response = await axios.get('http://localhost:5240/api/quote', {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};
export const deleteQuote = async (quoteId: number): Promise<QuoteModel> => {
  try {
    const response = await axios.delete(`http://localhost:5240/api/quote/${quoteId}`, {
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

// Submit new quote
export const submitQuote = async (quote: QuoteModel): Promise<QuoteModel> => {
  try {
    const response = await axios.post('http://localhost:5240/api/quote', quote);
    return response.data;
  } catch (error) {
    console.error('Error submitting Quote:', error);
    throw error;
  }
};







