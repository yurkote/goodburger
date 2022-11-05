import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import {
  setActiveType,
  setActiveSort,
  setActivePage,
  Sort,
} from "../../redux/slices/sortSlice";

import "./sortbar.scss";

export const sortVariant: Sort[] = [
  { name: "Relevant", sortProperty: "weight" },
  { name: "Rating", sortProperty: "rating" },
  { name: "Price ↓", sortProperty: "price" },
  { name: "Price ↑", sortProperty: "-price" },
  { name: "A-z", sortProperty: "-title" },
  { name: "Z-a", sortProperty: "title" },
];
const SortBar = () => {
  const [openSort, setOpenSort] = useState<boolean>(false);
  const refSortWindow = useRef(null);
  const { activeType, activeSort } = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  useOnClickOutside(refSortWindow, () => setOpenSort(false));

  const typesDish = ["All", "Vege", "Chiken", "Beef", "Seafood", "Pork"];
  const sortDisplay = activeSort.name;

  const handleClickType = (index: number) => () => {
    dispatch(setActiveType(index));
    dispatch(setActivePage(1));
  };

  const handleClickSort = (obj: Sort) => () => {
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
