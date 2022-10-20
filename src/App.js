import React, { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./components/context";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/Error";
import "./app.scss";

const App = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState(0);
  const [activeSort, setActiveSort] = useState({
    name: "Relevant",
    sortProperty: "weight",
  });

  const handleClickType = (typeDishIndex) => {
    typeDishIndex === activeType
      ? setActiveType(0)
      : setActiveType(typeDishIndex);
  };

  const handleClickSort = (typeSort) => (e) => setActiveSort(typeSort);

  useEffect(() => {
    setLoading(true);

    const sortBy = activeSort.sortProperty.replace('-', '');
    const order = activeSort.sortProperty.includes('-') ? 'desc' : 'asc';
    const category = activeType > 0 ? `category=${activeType}` : '';
    async function fetchData() {
      try {
        axios(
          `https://633770b95327df4c43d42ba8.mockapi.io/dishes?${category}&sortBy=${sortBy}&order=${order}`
        ).then((response) => {
          setCards(response.data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [activeType, activeSort]);

  return (
    <>
      <AppContext.Provider
        value={{
          cards,
          loading,
          activeType,
          activeSort,
          handleClickType,
          handleClickSort,
        }}
      >
        <div className="wrapper wrapper__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="product/:id" element={<Product />} />
            <Route path="cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default App;
