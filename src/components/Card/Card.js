import React from "react";

import "./card.scss";

// const data = [
//   {
//     id: 0,
//     title: "Shrimp Burger",
//     imageUrl:
//       "https://static.tildacdn.com/tild6463-3163-4136-b736-356661313338/shrimp_burger.png",
//     price: 5.42,
//     weight: 300,
//     calories: 400,
//     addons: [
//       { title: "Marinated onion", weightAddon: "10gr", priceAddon: "0.10" },
//       { title: "Sriracha (spicy)", weightAddon: "20gr", priceAddon: "0.30" },
//       { title: "Dorblu cheese", weightAddon: "25gr", priceAddon: "0.60" },
//       { title: "Fried egg", weightAddon: "40gr", priceAddon: "0.50" },
//     ],
//     category: 0,
//     rating: 4,
//   },
// ];

const Card = ({ title, imageUrl, price, weight, calories, addons }) => {
  return (
    <div className="card">
      <div className="card-img">
        <img src={imageUrl} alt="dish" className="image-card" />
        <div className="card-info info">
          <span className="info-kkal">~{calories}kkal</span>
          <span className="info-weight">{weight}g</span>
        </div>
      </div>
      <h2 className="card-title">
        <span>{title}</span>
      </h2>
      <div className="card-addons-box">
        <p className="addons-descr">Choose the addons:</p>
        <ul className="addons-list">
          {addons.map((item) => {
            return (
              <li className="addons-item" key={item.title}>
                <span>{`${item.title} + ${item.weightAddon} + $${item.priceAddon}`}</span>
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
          <button className="card-button">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
