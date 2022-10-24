import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import AppContext from "../context";

import "./card.scss";

const Card = ({ id, title, ingredients, imageUrl, price, weight, calories, addons, vege }) => {
  const refAddOn = useRef([]);
  const {setProductObj} = useContext(AppContext);

  const handleClickAddOn = (idx) => (e) => {
    refAddOn.current[idx].classList.toggle("addon-active");
  };

  // temporary for product page
  const clickImageHandler = () => {
    const obj = {id, title, ingredients, imageUrl, price, weight, calories, addons, vege };
    setProductObj(obj);
  };
  return (
    <div className="card">
      <div className="card-img">
        {vege && <div className="card-vege"><span>vege</span></div>}
        <Link onClick={clickImageHandler} to={`/product/${id}`}>
          <img src={imageUrl} alt="dish" className="image-card" />
          <div className="card-info info">
            <span className="info-kkal">~{calories}Kcal</span>
            <span className="info-weight">{weight}g</span>
          </div>
        </Link>
      </div>
      <h2 className="card-title">
        <span>{title}</span>
      </h2>
      <div className="card-addons-box">
        <p className="addons-descr">Choose the addons:</p>
        <ul className="addons-list">
          {addons.map((item, i) => {
            return (
              <li
                ref={(el) => (refAddOn.current[i] = el)}
                onClick={handleClickAddOn(i)}
                className="addons-item"
                key={item.title}
              >
                <span>{`${item.title}`}</span>
                <span>${item.priceAddon.toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card-footer">
        <div className="card-price">
          <span>${price}</span>
        </div>
        <div className="card-button-box">
          <button className="card-button">
            <span>Add to cart</span>
            {/* <span className="card-button__counter">10</span> */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
