import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "./Menu.css";
import { useAuth } from "../../Context/useAuth";
import { QuoteType } from "../../Models/QuoteModels";
import { PhotoType } from "../../Models/PhotoModels";

// Import icons
import { FaHome, FaQuoteRight, FaPhotoVideo, FaBook } from "react-icons/fa";

const Menu: React.FC = () => {
  const { isLoggedIn, user, logout, recordAction, actionData } = useAuth();
  const navigate = useNavigate(); // Use useNavigate hook
  const [isDropdownOpenQuote, setIsDropdownOpenQuote] = useState(false);
  const [isDropdownOpenPhoto, setIsDropdownOpenPhoto] = useState(false);

  // State for tracking actions
  const [mostClickedMenuItem, setMostClickedMenuItem] = useState<string | null>(null);
  const [leastClickedMenuItem, setLeastClickedMenuItem] = useState<string | null>(null);
  const [mostClickedQuoteType, setMostClickedQuoteType] = useState<string | null>(null);
  const [mostClickedPhotoType, setMostClickedPhotoType] = useState<string | null>(null);
  const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (actionData.length > 0) {
      const menuClicks = actionData.filter((a) => a.elementClass === "menu-item");
      const quoteClicks = actionData.filter((a) => a.elementClass === "quote-type");
      const photoClicks = actionData.filter((a) => a.elementClass === "photo-type");

      const mostClickedMenu = menuClicks.reduce(
        (prev, current) => (prev.quantity > current.quantity ? prev : current),
        menuClicks[0]
      );
      const leastClickedMenu = menuClicks.reduce(
        (prev, current) => (prev.quantity < current.quantity ? prev : current),
        menuClicks[0]
      );
      const mostClickedQuote = quoteClicks.reduce(
        (prev, current) => (prev.quantity > current.quantity ? prev : current),
        quoteClicks[0]
      );
      const mostClickedPhoto = photoClicks.reduce(
        (prev, current) => (prev.quantity > current.quantity ? prev : current),
        photoClicks[0]
      );

      if (mostClickedMenu) setMostClickedMenuItem(mostClickedMenu.action);
      if (leastClickedMenu) setLeastClickedMenuItem(leastClickedMenu.action);
      if (mostClickedQuote) setMostClickedQuoteType(mostClickedQuote.action);
      if (mostClickedPhoto) setMostClickedPhotoType(mostClickedPhoto.action);

      // Update click counts
      const counts: { [key: string]: number } = {};
      menuClicks.forEach((click) => {
        counts[click.action] = (counts[click.action] || 0) + click.quantity;
      });
      setClickCounts(counts);
    }
  }, [actionData]);

  const handleMenuClick = (menuItem: string) => {
    recordAction(menuItem, "menu-item");
    if (menuItem === "Quotes") {
      navigate("/quotes");
    } else if (menuItem === "Photos") {
      navigate("/photos");
    } else {
      navigate("/");
    }
  };

  const handleDropdownClickQuote = (type: QuoteType) => {
    recordAction(type, "quote-type");
    navigate(`/quotes?type=${type}`);
    setIsDropdownOpenQuote(false);
  };

  const handleDropdownClickPhoto = (type: PhotoType) => {
    recordAction(type, "photo-type");
    navigate(`/photos?type=${type}`);
    setIsDropdownOpenPhoto(false);
  };

  const getClassForMenuItem = (menuItem: string) => {
    if (menuItem === mostClickedMenuItem) return "menu-item most-clicked";
    if (menuItem === leastClickedMenuItem) return "menu-item least-clicked";
    return "menu-item";
  };

  const getClassForDropDownMenuItem = (menuItem: string, dropdownItem: string) => {
    if (menuItem === "Quotes" && dropdownItem === mostClickedQuoteType) return "dropdown-item most-clicked";
    if (menuItem === "Photos" && dropdownItem === mostClickedPhotoType) return "dropdown-item most-clicked";
    return "dropdown-item";
  };

  const shouldShowAsIcon = (menuItem: string) => {
    if (!mostClickedMenuItem || !clickCounts[mostClickedMenuItem] || !clickCounts[menuItem]) return false;
    return clickCounts[menuItem] + 5 < clickCounts[mostClickedMenuItem];
  };

  const renderMenuItem = (
    menuItem: string,
    label: string,
    icon: JSX.Element,
    link: string,
    hasDropdown?: boolean
  ) => {
    const itemContent = shouldShowAsIcon(menuItem) ? (
      <div className="menu-icon-item" onClick={() => handleMenuClick(menuItem)}>
        <Link to={link} className="icon-link">
          {icon}
          <span className="icon-label">{label}</span>
        </Link>
      </div>
    ) : (
      <Link to={link} className={getClassForMenuItem(menuItem)} onClick={() => handleMenuClick(menuItem)}>
        {label}
      </Link>
    );

    if (hasDropdown) {
      return (
        <div
          className="menu-dropdown-container"
          onMouseEnter={() =>
            menuItem === "Quotes"
              ? setIsDropdownOpenQuote(true)
              : setIsDropdownOpenPhoto(true)
          }
          onMouseLeave={() =>
            menuItem === "Quotes"
              ? setIsDropdownOpenQuote(false)
              : setIsDropdownOpenPhoto(false)
          }
        >
          {itemContent}
          {(menuItem === "Quotes" && isDropdownOpenQuote) || (menuItem === "Photos" && isDropdownOpenPhoto) ? (
            <div className="dropdown-menu">
              {(menuItem === "Quotes" ? Object.keys(QuoteType) : Object.keys(PhotoType))
                .filter((key) => isNaN(Number(key)))
                .map((key) => (
                  <a
                    key={key}
                    className={menuItem === "Quotes" ? getClassForDropDownMenuItem("Quotes", QuoteType[key as keyof typeof QuoteType])
                      : getClassForDropDownMenuItem("Photos", PhotoType[key as keyof typeof PhotoType])
                    }
                    onClick={() =>
                      menuItem === "Quotes"
                        ? handleDropdownClickQuote(QuoteType[key as keyof typeof QuoteType]) 
                        : handleDropdownClickPhoto(PhotoType[key as keyof typeof PhotoType])
                    }
                  >
                    {key}
                  </a>
                ))}
            </div>
          ) : null}
        </div>
      );
    }

    return itemContent;
  };

  return (
    <nav className="menu">
      <div className="menu-container">
        <div className="menu-left">
          {renderMenuItem("Home", "Home", <FaHome />, "/")}
          {renderMenuItem("Quotes", "Quotes", <FaQuoteRight />, "/quotes", true)}
          {renderMenuItem("Photos", "Photos", <FaPhotoVideo />, "/photos", true)}
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
              <Link to="/login" onClick={() => handleMenuClick("Login")}>
                Login
              </Link>
              <Link to="/register" onClick={() => handleMenuClick("Register")}>
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
