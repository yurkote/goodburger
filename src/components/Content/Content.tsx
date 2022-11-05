import { useAppSelector } from "../../helpers/hooks";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import CardLoader from "./CardLoader";

import "./content.scss";

const Content = () => {
  const { cards, status } = useAppSelector((state) => state.products);

  return (
    <section className="content">
      <h1 className="content-title">All dishes</h1>
      <div className="content-box">
        <div className="content-box__items">
          {status === "error" && (
            <div>Error in getting products, please trying again</div>
          )}
          {status === "loading"
            ? [...new Array(6)].map((_, i) => <CardLoader key={i} />)
            : cards.map((item) => <Card key={item.id} {...item} />)}
        </div>
      </div>
      <Pagination />
    </section>
  );
};

export default Content;
