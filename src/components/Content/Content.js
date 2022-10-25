import React, { useContext } from "react";
import Card from "../Card/Card";
import AppContext from "../context";
import Pagination from "../Pagination/Pagination";
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
      <Pagination />
    </section>
  );
};

export default Content;
