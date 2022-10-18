import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SortBar from "./components/SortBar/SortBar";
import Content from "./components/Content/Content";
import axios from "axios";

import "./app.scss";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";

const App = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        axios("https://633770b95327df4c43d42ba8.mockapi.io/dishes").then(
          (response) => {
            setCards(response.data);
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="wrapper wrapper__container">
        <Header search />
        <SortBar />
        <Content cards={cards} />
        <Cart />
        <Product />
      </div>
    </>
  );
};

export default App;
