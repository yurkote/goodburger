import React from "react";

import "./sortbar.scss";

const SortBar = () => {
  return (
    <section className="sortbar">
      <div className="sortbar-items">
        <ul className="sortbar-list">
          <li className="sortbar-list__button sortbar-active">All</li>
          <li className="sortbar-list__button">Burgers</li>
          <li className="sortbar-list__button">Drinks</li>
        </ul>
      </div>
      <div className="sortbar-items">
        <div className="sorting-box">
          <div className="sort-button">
            <span className="sort-button__text">Sort by:</span>
          </div>
          <ul className="sorting-select">
            <li className="sorting-select__item sort-active">
              <span>Rating</span>
            </li>
            <li className="sorting-select__item">
              <span>Relevant</span>
            </li>
            <li className="sorting-select__item">
              <span>A-Z</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default SortBar;
