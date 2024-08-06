import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Menu.css";
import { useAuth } from "../../Context/useAuth";
import { QuoteQueryObject, QuoteType } from "../../Models/QuoteModels";
import { PhotoQueryObject, PhotoType } from "../../Models/PhotoModels";

interface MenuProps {
  onQuoteTypeChange: (query: QuoteQueryObject) => void;
  onMenuClick: (menuItem: string) => void; // Add this prop
  onPhotoTypeChange: (query: PhotoQueryObject) => void;
}


const Menu: React.FC<MenuProps> = ({ onQuoteTypeChange, onMenuClick,  onPhotoTypeChange }) => {
  const { isLoggedIn, user, logout } = useAuth();
  const [isDropdownOpenQuote, setIsDropdownOpenQuote] = useState(false);
  const [isDropdownOpenPhoto, setIsDropdownOpenPhoto] = useState(false);

  const handleMouseEnterQuote = () => {
      setIsDropdownOpenQuote(true);
    }

  const handleMouseLeaveQuote = () => {
      setIsDropdownOpenQuote(false);
  };
  const handleMouseEnterPhoto = () => {
      setIsDropdownOpenPhoto(true);
    }

  const handleMouseLeavePhoto = () => {
      setIsDropdownOpenPhoto(false);
  };

  const handleMenuClick = (menuItem: string) => {
    onMenuClick(menuItem); // Notify HomePage about the menu click
  };

  const handleDropdownClickQuote = (type: QuoteType) => {
    onQuoteTypeChange({ type });
    setIsDropdownOpenQuote(false);
  };
  const handleDropdownClickPhoto = (type: PhotoType) => {
    onPhotoTypeChange({ type });
    setIsDropdownOpenPhoto(false);
  };

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="menu-left">
          <Link to="/" onClick={() => handleMenuClick("Home")}>
            <img src={logo} alt="Logo" />
          </Link>
          <Link to="/search" onClick={() => handleMenuClick("Search")}>Search</Link>
          <div
            className="menu-item"
            onMouseEnter={handleMouseEnterQuote}
            onMouseLeave={handleMouseLeaveQuote}
          >
            <Link to="/Quotes" onClick={() => handleMenuClick("Quotes")}>Quotes</Link>
            {isDropdownOpenQuote && (
              <div className="dropdown-menu">
                {Object.keys(QuoteType)
                  .filter((key) => isNaN(Number(key))) // Filter out numeric keys
                  .map((key) => (
                    <a
                      key={key}
                      onClick={() => handleDropdownClickQuote(QuoteType[key as keyof typeof QuoteType])}
                    >
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>

          <div
            className="menu-item"
            onMouseEnter={handleMouseEnterPhoto}
            onMouseLeave={handleMouseLeavePhoto}
          >
            <Link to="/photos" onClick={() => handleMenuClick("Photos")}>Photos</Link>
            {isDropdownOpenPhoto && (
              <div className="dropdown-menu">
                {Object.keys(PhotoType)
                  .filter((key) => isNaN(Number(key))) // Filter out numeric keys
                  .map((key) => (
                    <a
                      key={key}
                      onClick={() => handleDropdownClickPhoto(PhotoType[key as keyof typeof PhotoType])}
                    >
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          
          <Link to="/diary" onClick={() => handleMenuClick("Diary")}>Diary</Link>
        </div>
        <div className="menu-right">
          {isLoggedIn() ? (
            <>
              <span>Welcome, {user?.userName}</span>
              <button onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => handleMenuClick("Login")}>Login</Link>
              <Link to="/register" onClick={() => handleMenuClick("Register")}>Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
