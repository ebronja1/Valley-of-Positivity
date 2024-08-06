import axios from 'axios';
import { QuoteQueryObject } from '../Models/QuoteModels';
import { QuoteModel } from '../Models/QuoteModels';

export const fetchQuotes = async (queryObject?: QuoteQueryObject): Promise<QuoteModel[]> => {
  try {
    const response = await axios.get('http://localhost:5240/api/quote', {
      params: queryObject,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};






