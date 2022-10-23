import React, { useContext } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import AppContext from "../context";
import "./header.scss";

const Header = ({ search, cartBtn }) => {
  const { searchValue, setSearchValue, setActiveType } = useContext(AppContext);

  // must be setActiveType(0) because mockApi
  // don't works with few filters
  const onChangeHandler = (e) => (
    setActiveType(0), setSearchValue(e.target.value)
  );

  return (
    <header className="header">
      <div className="header-box">
        <div className="header-box__item-logo header-item header-item">
          <div className="header-item__logo">
            <Link to={"/"} href="/" className="logo-link">
              <img src={logo} alt="logo" className="logo-img" />
            </Link>
          </div>
        </div>
        {search && (
          <div className="header-box__item-input header-item">
            <div className="header-item__input">
              {searchValue ? (
                <div
                  onClick={() => setSearchValue("")}
                  className="header-input__icon header-input__icon--cursor-pointer"
                >
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M437.5,386.6L306.9,256l130.6-130.6c14.1-14.1,14.1-36.8,0-50.9c-14.1-14.1-36.8-14.1-50.9,0L256,205.1L125.4,74.5  c-14.1-14.1-36.8-14.1-50.9,0c-14.1,14.1-14.1,36.8,0,50.9L205.1,256L74.5,386.6c-14.1,14.1-14.1,36.8,0,50.9  c14.1,14.1,36.8,14.1,50.9,0L256,306.9l130.6,130.6c14.1,14.1,36.8,14.1,50.9,0C451.5,423.4,451.5,400.6,437.5,386.6z" />
                  </svg>
                </div>
              ) : (
                <div className="header-input__icon">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title />
                    <path
                      d="M20.56,18.44l-4.67-4.67a7,7,0,1,0-2.12,2.12l4.67,4.67a1.5,1.5,0,0,0,2.12,0A1.49,1.49,0,0,0,20.56,18.44ZM5,10a5,5,0,1,1,5,5A5,5,0,0,1,5,10Z"
                      fill="#464646"
                    />
                  </svg>
                </div>
              )}

              <input
                value={searchValue}
                onChange={onChangeHandler}
                type="text"
                className="header-input"
                placeholder="Search product..."
              />
            </div>
          </div>
        )}
        {cartBtn && (
          <div className="header-box__item-cart header-item">
            <div className="header-item__cart">
              <Link to={`/cart`} href="/" className="header-cart-button">
                <span className="cart-button__price">$500.00</span>
                <span className="cart-button__badge">99</span>
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                    stroke="black"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                    stroke="black"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                    stroke="black"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
