import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import "./Menu.css";
import { useAuth } from "../../Context/useAuth";
import { QuoteQueryObject, QuoteType } from "../../Models/QuoteModels";
import { PhotoQueryObject, PhotoType } from "../../Models/PhotoModels";

// Import icons (assuming you have icons set up)
import { FaHome, FaQuoteRight, FaPhotoVideo, FaBook } from 'react-icons/fa';

interface MenuProps {
  onQuoteTypeChange: (query: QuoteQueryObject) => void;
  onMenuClick: (menuItem: string) => void;
  onPhotoTypeChange: (query: PhotoQueryObject) => void;
}

const Menu: React.FC<MenuProps> = ({ onQuoteTypeChange, onMenuClick, onPhotoTypeChange }) => {
  const { isLoggedIn, user, logout, recordAction, actionData } = useAuth();
  const [isDropdownOpenQuote, setIsDropdownOpenQuote] = useState(false);
  const [isDropdownOpenPhoto, setIsDropdownOpenPhoto] = useState(false);

  const [mostClickedMenuItem, setMostClickedMenuItem] = useState<string | null>(null);
  const [leastClickedMenuItem, setLeastClickedMenuItem] = useState<string | null>(null);
  const [mostClickedQuoteType, setMostClickedQuoteType] = useState<string | null>(null);
  const [mostClickedPhotoType, setMostClickedPhotoType] = useState<string | null>(null);
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (actionData.length > 0) {
      const menuClicks = actionData.filter(a => a.elementClass === "menu-item");
      const quoteClicks = actionData.filter(a => a.elementClass === "quote-type");
      const photoClicks = actionData.filter(a => a.elementClass === "photo-type");

      const mostClickedMenu = menuClicks.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current, menuClicks[0]);
      const leastClickedMenu = menuClicks.reduce((prev, current) => (prev.quantity < current.quantity) ? prev : current, menuClicks[0]);
      const mostClickedQuote = quoteClicks.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current, quoteClicks[0]);
      const mostClickedPhoto = photoClicks.reduce((prev, current) => (prev.quantity > current.quantity) ? prev : current, photoClicks[0]);

      if (mostClickedMenu) setMostClickedMenuItem(mostClickedMenu.action);
      if (leastClickedMenu) setLeastClickedMenuItem(leastClickedMenu.action);
      if (mostClickedQuote) setMostClickedQuoteType(mostClickedQuote.action);
      if (mostClickedPhoto) setMostClickedPhotoType(mostClickedPhoto.action);

      // Update click counts
      const counts: { [key: string]: number } = {};
      menuClicks.forEach(click => {
        counts[click.action] = (counts[click.action] || 0) + click.quantity;
      });
      setClickCounts(counts);
    }
  }, [actionData]);

  const handleMenuClick = (menuItem: string) => {
    recordAction(menuItem, "menu-item");
    onMenuClick(menuItem);
  };

  const handleDropdownClickQuote = (type: QuoteType) => {
    recordAction(type, "quote-type");
    onQuoteTypeChange({ type });
    setIsDropdownOpenQuote(false);
  };

  const handleDropdownClickPhoto = (type: PhotoType) => {
    recordAction(type, "photo-type");
    onPhotoTypeChange({ type });
    setIsDropdownOpenPhoto(false);
  };

  const getClassForMenuItem = (menuItem: string) => {
    if (menuItem === mostClickedMenuItem) return "menu-item most-clicked";
    if (menuItem === leastClickedMenuItem) return "menu-item least-clicked";
    return "menu-item";
  };

  const getClassForDropdownItem = (item: string, type: "quote-type" | "photo-type") => {
    if (type === "quote-type" && item === mostClickedQuoteType) return "dropdown-item most-clicked";
    if (type === "photo-type" && item === mostClickedPhotoType) return "dropdown-item most-clicked";
    return "dropdown-item";
  };

  const shouldShowAsIcon = (menuItem: string) => {
    if (!mostClickedMenuItem || !clickCounts[mostClickedMenuItem] || !clickCounts[menuItem]) return false;
    return clickCounts[menuItem] <= clickCounts[mostClickedMenuItem] + 5;
  };

  const renderMenuItem = (menuItem: string, label: string, icon: JSX.Element, link: string) => {
    if (shouldShowAsIcon(menuItem)) {
      return (
        <div className="menu-icon-item" title={label} onClick={() => handleMenuClick(menuItem)}>
          <Link to={link}>{icon}</Link>
        </div>
      );
    }
    return (
      <Link to={link} className={getClassForMenuItem(menuItem)} onClick={() => handleMenuClick(menuItem)}>
        {label}
      </Link>
    );
  };

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="menu-left">
          {renderMenuItem("Home", "Home", <FaHome />, "/")}
          <div
            className={getClassForMenuItem("Quotes")}
            onMouseEnter={() => setIsDropdownOpenQuote(true)}
            onMouseLeave={() => setIsDropdownOpenQuote(false)}
          >
            <Link to="/Quotes" onClick={() => handleMenuClick("Quotes")}>Quotes</Link>
            {isDropdownOpenQuote && (
              <div className="dropdown-menu">
                {Object.keys(QuoteType)
                  .filter((key) => isNaN(Number(key)))
                  .map((key) => (
                    <a
                      key={key}
                      className={getClassForDropdownItem(key, "quote-type")}
                      onClick={() => handleDropdownClickQuote(QuoteType[key as keyof typeof QuoteType])}
                    >
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          <div
            className={getClassForMenuItem("Photos")}
            onMouseEnter={() => setIsDropdownOpenPhoto(true)}
            onMouseLeave={() => setIsDropdownOpenPhoto(false)}
          >
            <Link to="/photos" onClick={() => handleMenuClick("Photos")}>Photos</Link>
            {isDropdownOpenPhoto && (
              <div className="dropdown-menu">
                {Object.keys(PhotoType)
                  .filter((key) => isNaN(Number(key)))
                  .map((key) => (
                    <a
                      key={key}
                      className={getClassForDropdownItem(key, "photo-type")}
                      onClick={() => handleDropdownClickPhoto(PhotoType[key as keyof typeof PhotoType])}
                    >
                      {key}
                    </a>
                  ))}
              </div>
            )}
          </div>
          {renderMenuItem("Diary", "Diary", <FaBook />, "/diary")}
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
