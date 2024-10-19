// src/services/QuoteService.ts
import axios from 'axios';
import { QuoteQueryObject, QuoteModel } from '../Models/QuoteModels';

// Get the API base URL from the environment variable, or default to localhost if not set
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5240/api';

// Fetch quotes (existing function)
export const fetchQuotes = async (queryObject?: QuoteQueryObject): Promise<QuoteModel[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/quote`, {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
};

// Delete a quote
export const deleteQuote = async (quoteId: number): Promise<QuoteModel> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/quote/${quoteId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting quote:', error);
    throw error;
  }
};

// Submit new quote
export const submitQuote = async (quote: QuoteModel): Promise<QuoteModel> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/quote`, quote);
    return response.data;
  } catch (error) {
    console.error('Error submitting Quote:', error);
    throw error;
  }
};








