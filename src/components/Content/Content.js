import React, { useContext } from "react";
import Card from "../Card/Card";
import AppContext from "../context";
import CardLoader from "./CardLoader";

import "./content.scss";

const Content = () => {
  const { cards, loading } = useContext(AppContext);
  return (
    <section className="content">
      <h1 className="content-title">All dishes</h1>
      <div className="content-box">
        <div className="content-box__items">
          {loading
            ? [...new Array(6)].map((_, i) => <CardLoader key={i} />)
            : cards.map((item) => <Card key={item.id} {...item} />)}
        </div>
      </div>
      {/* pagination component */}
      <div className="pagination">
        <ul className="pagination-items">
          <li className="pagination-nav__prev pagination__button ">
            <span>Prev</span>
          </li>
          <li className="pagination__button current-page">
            <span>1</span>
          </li>
          <li className="pagination__button">
            <span>2</span>
          </li>
          <li className="pagination__button">
            <span>3</span>
          </li>
          <li className="pagination-nav__next pagination__button">
            <span>Next</span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Content;
