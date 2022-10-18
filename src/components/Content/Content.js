import React from "react";
import Card from "../Card/Card";

import "./content.scss";

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
//   {
//     id: 1,
//     title: "Blue Cheesburger",
//     imageUrl:
//       "https://static.tildacdn.com/tild3339-6164-4535-a266-333633383932/Blue_cheeseburger.jpg",
//     price: 4.08,
//     weight: 350,
//     calories: 530,
//     addons: [
//       { title: "Marinated onion", weightAddon: "10gr", priceAddon: "0.10" },
//       { title: "Sriracha (spicy)", weightAddon: "20gr", priceAddon: "0.30" },
//       { title: "Dorblu cheese", weightAddon: "25gr", priceAddon: "0.60" },
//       { title: "Fried egg", weightAddon: "40gr", priceAddon: "0.50" },
//     ],
//     category: 0,
//     rating: 4,
//   },
//   {
//     id: 2,
//     title: "American Burger",
//     imageUrl:
//       "https://static.tildacdn.com/tild6437-3136-4464-b162-313761316166/American_burger.jpg",
//     price: 3.05,
//     weight: 300,
//     calories: 510,
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

const Content = ({cards}) => {
  return (
    <section className="content">
      <h1 className="content-title">All dishes</h1>
      <div className="content-box">
        <div className="content-box__items">
          {cards.map((item) => (
            <Card key={item.id} {...item} />
          ))}
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
