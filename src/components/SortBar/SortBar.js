import React, { useContext, useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import AppContext from "../context";

import "./sortbar.scss";

const SortBar = () => {
  const [openSort, setOpenSort] = useState(false);
  const refSortWindow = useRef();
  const { activeType, activeSort, handleClickType, handleClickSort } =
    useContext(AppContext);
  useOnClickOutside(refSortWindow, () => setOpenSort(false));

  const typesDish = ["All", "Burgers", "Drinks"];
  const sortVariant = [
    { name: "Relevant", sortProperty: "weight" },
    { name: "Rating", sortProperty: "rating" },
    { name: "Price ↓", sortProperty: "price" },
    { name: "Price ↑", sortProperty: "-price" },
    { name: "A-z", sortProperty: "title" },
    { name: "Z-a", sortProperty: "-title" },
  ];
  const sortDisplay = activeSort.name;

  return (
    <section className="sortbar">
      <div className="sortbar-items">
        <ul className="sortbar-list">
          {typesDish.map((item, i) => (
            <li
              key={i}
              onClick={() => handleClickType(i)}
              className={`sortbar-list__button ${
                activeType === i ? "sortbar-active" : ""
              }`}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="sortbar-items">
        <div className="sorting-box">
          <div className="sort-button" onClick={() => setOpenSort(!openSort)}>
            <span className="sort-button__text">Sort by:</span>
            <span className="sort-button__text-active">{sortDisplay}</span>
          </div>
          {openSort && (
            <ul ref={refSortWindow} className="sorting-select">
              {sortVariant.map((obj, i) => (
                <li
                  key={i}
                  onClick={handleClickSort(obj)}
                  className={`sorting-select__item ${
                    sortDisplay === obj.name ? "sort-active" : ""
                  }`}
                >
                  <span>{obj.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default SortBar;
