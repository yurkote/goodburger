import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { setActiveType, setActiveSort, setActivePage } from "../../redux/slices/sortSlice";

import "./sortbar.scss";

const SortBar = () => {
  const [openSort, setOpenSort] = useState(false);
  const refSortWindow = useRef();
  const { activeType, activeSort } = useSelector((state) => state.sort);
  const dispatch = useDispatch();

  useOnClickOutside(refSortWindow, () => setOpenSort(false));

  const typesDish = ["All", "Vege", "Chiken", "Beef", "Seafood", "Pork"];
  const sortVariant = [
    { name: "Relevant", sortProperty: "weight" },
    { name: "Rating", sortProperty: "rating" },
    { name: "Price ↓", sortProperty: "price" },
    { name: "Price ↑", sortProperty: "-price" },
    { name: "A-z", sortProperty: "-title" },
    { name: "Z-a", sortProperty: "title" },
  ];
  const sortDisplay = activeSort.name;

  const handleClickType = (index) => (e) => {
    dispatch(setActiveType(index));
    dispatch(setActivePage(1));
  };

  const handleClickSort = (obj) => (e) => {
    dispatch(setActiveSort(obj));
  };

  return (
    <section className="sortbar">
      <div className="sortbar-items">
        <ul className="sortbar-list">
          {typesDish.map((item, i) => (
            <li
              key={i}
              onClick={handleClickType(i)}
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
