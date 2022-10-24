import React, { useEffect, useState } from "react";
import axios from "axios";
import AppContext from "./components/context";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { Route, Routes } from "react-router-dom";
import ErrorPage from "./pages/Error";
import "./app.scss";
import { useSelector } from "react-redux";

const App = () => {
  // temporary id for product page
  const [productObj, setProductObj] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const { activeType, activeSort } = useSelector((state) => state.sort);

  useEffect(() => {
    setLoading(true);

    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.sortProperty.includes("-") ? "asc" : "desc";
    const category = activeType > 0 ? `category=${activeType}` : "";
    const search = searchValue ? `&title=${searchValue}` : "";
    async function fetchData() {
      try {
        axios(
          `https://633770b95327df4c43d42ba8.mockapi.io/dishes?p=1&l=6&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then((response) => {
          setCards(response.data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [activeType, activeSort, searchValue]);

  return (
    <>
      <AppContext.Provider
        value={{
          cards,
          loading,
          searchValue,
          setProductObj,
          setSearchValue,
        }}
      >
        <div className="wrapper wrapper__container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/product/:id"
              element={<Product productObj={productObj} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </AppContext.Provider>
    </>
  );
};

export default App;
