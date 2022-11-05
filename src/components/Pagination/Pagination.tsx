import React from "react";
import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { setActivePage } from "../../redux/slices/sortSlice";
import "./pagination.scss";

const Pagination = () => {
  const { activePage } = useAppSelector((state) => state.sort);
  const dispatch = useAppDispatch();

  const handlePageClick = (page: number) => () => {
    dispatch(setActivePage(page));
  };

  return (
    <div className="pagination">
      <ul className="pagination-items">
        {/* <li className="pagination-nav__prev pagination__button ">
          <span>Prev</span>
        </li> */}
        {[...new Array(3)].map((_, i) => (
          <li
            key={i}
            onClick={handlePageClick(i + 1)}
            className={`pagination__button ${
              activePage === i + 1 ? "current-page" : ""
            } `}
          >
            <span>{i + 1}</span>
          </li>
        ))}
        {/* <li className="pagination-nav__next pagination__button">
          <span>Next</span>
        </li> */}
      </ul>
    </div>
  );
};

export default Pagination;
