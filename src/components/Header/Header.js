import React from "react";

import logo from "../../assets/img/logo.png";
import "./header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header-box">
        <div className="header-box__item header-item">
          <div className="header-item__logo">
            <a href="/" className="logo-link">
              <img src={logo} alt="logo" className="logo-img" />
            </a>
          </div>
        </div>
        <div className="header-box__item header-item">
          <div className="header-item__input">
            <input type="text" className="header-input" />
          </div>
        </div>
        <div className="header-box__item header-item">
          <div className="header-item__cart">
            <a href="/" className="header-cart">
              <img src="#" alt="cart-icon" className="cart-icon" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
