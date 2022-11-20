import React, { useContext, ChangeEvent, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { setActiveType, setSearchValue } from "../../redux/slices/sortSlice";

import logo from "../../assets/img/logo.png";
import "./header.scss";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { ThemeContext } from "../../context/ThemeContext";

type HeaderProps = {
  search?: boolean;
  cartBtn?: boolean;
};

const Header: React.FC<HeaderProps> = ({ search, cartBtn }) => {
  const searchValue = useAppSelector((state) => state.sort.inputValue);
  const { items, totalPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const searchInput = useRef<HTMLInputElement>(null);
  const isMounted = useRef(false);
  const { theme, setTheme } = useContext(ThemeContext);
  console.log(theme);

  const totalProducts = items.reduce((prev, curr) => prev + curr.count, 0);

  // must be setActiveType(0) because mockApi
  // don't works with few filters
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => (
    dispatch(setActiveType(0)), dispatch(setSearchValue(e.target.value))
  );
  const clearInput = () => (
    dispatch(setSearchValue("")), searchInput?.current?.focus()
  );
  const themeSwitchHandler = () => {
    theme === "dark" ? setTheme("light") : setTheme("dark");
  };

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(items);
      localStorage.setItem("cart", json);
    }

    isMounted.current = true;
  }, [items]);
  return (
    <header className="header">
      <div className="header-box">
        <div className="header-box__item-logo header-item">
          <div className="header-item__logo">
            <Link to={"/"} className="logo-link">
              <img src={logo} alt="logo" className="logo-img" />
            </Link>
          </div>
        </div>
        {search && (
          <div className="header-box__item-input header-item">
            <div className="header-item__input">
              {searchValue ? (
                <div
                  onClick={clearInput}
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
                ref={searchInput}
                value={searchValue}
                onChange={onChangeHandler}
                type="text"
                className="header-input"
                placeholder="Search product..."
              />
            </div>
          </div>
        )}
        <div className="header-box__item-cart header-item">
          <div className="header-item__theme">
            <button
              onClick={themeSwitchHandler}
              type="button"
              className="header-item__theme--button"
            >
              {theme === "light" ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z" />
                </svg>
              ) : (
                <svg
                  fill="#fff"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 246 246"
                  xmlSpace="preserve"
                >
                  <path
                    d="M189.024,122.5c0,36.188-29.336,65.524-65.524,65.524c-36.188,0-65.524-29.336-65.524-65.524
                c0-36.188,29.336-65.524,65.524-65.524C159.688,56.976,189.024,86.312,189.024,122.5z M122.667,43c4.143,0,7.5-3.357,7.5-7.5v-28
                c0-4.143-3.357-7.5-7.5-7.5s-7.5,3.357-7.5,7.5v28C115.167,39.643,118.524,43,122.667,43z M184.444,68.438
                c1.919,0,3.839-0.732,5.304-2.197l14.849-14.85c2.929-2.929,2.929-7.678-0.001-10.606c-2.928-2.928-7.677-2.929-10.606,0.001
                l-14.849,14.85c-2.929,2.929-2.929,7.678,0.001,10.606C180.605,67.705,182.525,68.438,184.444,68.438z M190.366,178.14
                c-2.93-2.928-7.678-2.928-10.607,0c-2.929,2.93-2.929,7.678,0,10.607l14.85,14.85c1.465,1.464,3.385,2.196,5.304,2.196
                s3.839-0.732,5.304-2.196c2.929-2.93,2.929-7.678,0-10.607L190.366,178.14z M57.253,178.759l-14.85,14.85
                c-2.929,2.93-2.929,7.678,0,10.607c1.465,1.464,3.385,2.196,5.304,2.196s3.839-0.732,5.304-2.196l14.85-14.85
                c2.929-2.93,2.929-7.678,0-10.607C64.931,175.831,60.183,175.831,57.253,178.759z M56.634,66.859
                c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.606l-14.849-14.85
                c-2.93-2.93-7.679-2.929-10.606-0.001c-2.93,2.929-2.93,7.678-0.001,10.606L56.634,66.859z M238.5,114.5h-7h-21
                c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h21h7c4.143,0,7.5-3.357,7.5-7.5S242.643,114.5,238.5,114.5z M123.667,202
                c-4.143,0-7.5,3.357-7.5,7.5v21v8c0,4.143,3.357,7.5,7.5,7.5s7.5-3.357,7.5-7.5v-8v-21C131.167,205.357,127.81,202,123.667,202z
                M44,123c0-4.143-3.357-7.5-7.5-7.5h-21h-8c-4.143,0-7.5,3.357-7.5,7.5s3.357,7.5,7.5,7.5h8h21C40.643,130.5,44,127.143,44,123z"
                  />
                </svg>
              )}
            </button>
          </div>
          {cartBtn && (
            <div className="header-item__cart">
              <Link to={`/cart`} className="header-cart-button">
                {totalPrice > 0 && (
                  <span className="cart-button__price">
                    ${totalPrice.toFixed(2)}
                  </span>
                )}
                {items.length > 0 && (
                  <span className="cart-button__badge">{totalProducts}</span>
                )}
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
