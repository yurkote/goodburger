import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import AppContext from "./components/context";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { Route, Routes, useSearchParams } from "react-router-dom";
import ErrorPage from "./pages/Error";
import "./app.scss";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "use-lodash-debounce";
import { sortVariant } from "./components/SortBar/SortBar";
import { setParamsToState } from "./redux/slices/sortSlice";

const App = () => {
  // temporary id for product page
  const [productObj, setProductObj] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { activeType, activeSort, activePage, inputValue } = useSelector(
    (state) => state.sort
  );
  const debouncedSearchValue = useDebounce(inputValue, 350);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = useRef(false);
  const firstRender = useRef(false);

  useEffect(() => {
    if ([...searchParams].length > 0) {
      const currentParams = Object.fromEntries([...searchParams]);
      const sort = sortVariant.find(
        (obj) => obj.sortProperty === currentParams.activeSort
      );
      dispatch(setParamsToState({ ...currentParams, sort }));
      query.current = true;
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    // if open page with start 'search' query 
    // requests to the server sends twice 
    // because debouncedSearchValue has delay
    if (firstRender.current) {
      const params = {
        activeType,
        activeSort: activeSort.sortProperty,
        activePage,
        inputValue,
      };
      console.log("inp ", inputValue);
      setSearchParams(params);
    }
    firstRender.current = true;

    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.sortProperty.includes("-") ? "asc" : "desc";
    const category = activeType > 0 ? `category=${activeType}` : "";
    const search = inputValue ? `&title=${inputValue}` : "";

    async function fetchData() {
      try {
        axios(
          `https://633770b95327df4c43d42ba8.mockapi.io/dishes?p=${activePage}&l=6&${category}&sortBy=${sortBy}&order=${order}${search}`
        ).then((response) => {
          setCards(response.data);
          setLoading(false);
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (!query.current) {
      fetchData();
    }
    query.current = false;
  }, [activeType, activeSort, debouncedSearchValue, activePage]);

  return (
    <>
      <AppContext.Provider
        value={{
          cards,
          loading,
          setProductObj,
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
