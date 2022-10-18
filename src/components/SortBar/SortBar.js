import React, { useRef, useState } from "react";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

import "./sortbar.scss";

const SortBar = () => {
  const [activeType, setActiveType] = useState(0);
  const [openSort, setOpenSort] = useState(false);
  const [activeSort, setActiveSort] = useState(0);
  const refSortWindow = useRef();
  useOnClickOutside(refSortWindow, () => setOpenSort(false));

  const typesDish = ["All", "Burgers", "Drinks"];
  const sortVariant = ["Rating", "Relevant", "Best Selling", "A-z"];
  const sortDisplay = sortVariant[activeSort];

  const handleClickType = (typeDishIndex) => {
    typeDishIndex === activeType
      ? setActiveType(0)
      : setActiveType(typeDishIndex);
  };
  const handleClickSort = (typeSort) => (e) => setActiveSort(typeSort);

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
              {sortVariant.map((val, i) => (
                <li
                  key={i}
                  onClick={handleClickSort(i)}
                  className={`sorting-select__item ${
                    activeSort === i ? "sort-active" : ""
                  }`}
                >
                  <span>{val}</span>
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
