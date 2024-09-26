import React, { useState } from "react";
import "./Quote.css";
import { useAuth } from "../../Context/useAuth"; // Importing user authentication hook
import { QuoteModel } from "../../Models/QuoteModels";
import { deleteQuote } from "../../Services/QuoteService";
import { toast } from "react-toastify";

interface QuoteProps {
  quote: QuoteModel
}

const Quote: React.FC<QuoteProps> = ({ quote }) => {
  const { isAdmin } = useAuth();  // Assuming useAuth provides user info like role
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onDelete = async (event: React.MouseEvent<HTMLButtonElement>, id: number) => {
    event.preventDefault(); // Prevent default behavior

    try {
      await deleteQuote(id);
      toast.success('Quote deleted successfully!');
    } catch (error) {
      console.error('Failed to delete quote:', error);
      toast.error('Failed to delete quote. Please try again.');
    }
    window.location.reload();
  };

  return (
    <div>
      {/* Quote Display */}
      <div className="quote" onClick={toggleModal}>
        <p>{quote.text}</p>
        <p>{quote.author}</p>
      </div>

      {/* Admin options (if the user is an admin) */}
      {isAdmin() && (
        <div className="quote-admin-options">
          <button onClick={(event) => onDelete(event, quote.id)}>Delete</button> {/* Prevent default behavior */}
        </div>
      )}

      {/* Modal for viewing full quote */}
      {isModalOpen && (
        <div className="quote-modal" onClick={toggleModal}>
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <p className="modal-quote-text">{quote.text}</p>
            <p className="modal-quote-author">{quote.author}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quote;


