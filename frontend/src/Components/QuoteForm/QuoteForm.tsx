// src/components/QuoteForm.tsx
import React, { useState } from 'react';
import { QuoteType, QuoteModel } from '../../Models/QuoteModels';
import { submitQuote } from '../../Services/QuoteService';
import { toast } from 'react-toastify';

const QuoteForm: React.FC = () => {
    const [quote, setQuote] = useState<QuoteModel>({
        id: 0,
        text: '',
        type: QuoteType.Inspirational,
        author: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setQuote({ ...quote, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newQuote = await submitQuote(quote);
            if (newQuote) {
                toast.success('Quote added successfully!');
                newQuote.author = '';
                newQuote.text = '';
                setQuote(newQuote);
              }
            console.log('Quote submitted successfully:', newQuote);
            // Optionally reset form or show a success message
        } catch (error) {
            console.error('Error submitting quote:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Submit Quote</h2>
            <textarea
                name="text"
                value={quote.text}
                onChange={handleInputChange}
                placeholder="Enter your quote"
                required
            />
            <input
                type="text"
                name="author"
                value={quote.author}
                onChange={handleInputChange}
                placeholder="Author's name"
            />
            <select
                name="type"
                value={quote.type}
                onChange={handleInputChange}
            >
                {Object.values(QuoteType).map(type => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>
            <button type="submit">Submit Quote</button>
        </form>
    );
};

export default QuoteForm;
