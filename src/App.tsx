import React, { Suspense, useEffect, useRef } from "react";
import Home from "./pages/Home";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { useDebounce } from "use-lodash-debounce";
import { sortVariant } from "./components/SortBar/SortBar";
import { setParamsToState } from "./redux/slices/sortSlice";
import { fetchProducts } from "./redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "./helpers/hooks";
import "./app.scss";
import { ThemeContext, themes } from "./theme/ThemeContext";
import Toggle from "./components/Toggle";

const Cart = React.lazy(
  () => import(/* webpackChunkName: "Cart" */ "./pages/Cart")
);
const ErrorPage = React.lazy(
  () => import(/* webpackChunkName: "Error" */ "./pages/Error")
);
const Product = React.lazy(
  () => import(/* webpackChunkName: "Product" */ "./pages/Product")
);

const App: React.FC = () => {
  const { activeType, activeSort, activePage, inputValue } = useAppSelector(
    (state) => state.sort
  );
  const debouncedSearchValue = useDebounce(inputValue, 350);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const query = useRef<boolean>(false);
  const firstRender = useRef<boolean>(false);

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
  console.log(ThemeContext.Consumer);
  useEffect(() => {
    // if open page with start 'search' query
    // requests to the server sends twice
    // because debouncedSearchValue has delay
    if (firstRender.current) {
      const params = {
        activeType: activeType.toString(),
        activeSort: activeSort.sortProperty,
        activePage: activePage.toString(),
        inputValue,
      };
      setSearchParams(params);
    }
    firstRender.current = true;

    const sortBy = activeSort.sortProperty.replace("-", "");
    const order = activeSort.sortProperty.includes("-") ? "asc" : "desc";
    const category = +activeType > 0 ? `category=${activeType}` : "";
    const search = inputValue ? `&title=${inputValue}` : "";

    if (!query.current) {
      dispatch(fetchProducts({ sortBy, order, category, search, activePage }));
    }
    query.current = false;
  }, [activeType, activeSort, debouncedSearchValue, activePage]);

  return (
    <>
      <ThemeContext.Consumer>
        {({ theme, setTheme }:any) => (
          <Toggle
            onChange={() => {
              if (theme === themes.light) setTheme(themes.dark);
              if (theme === themes.dark) setTheme(themes.light);
            }}
            value={theme === themes.dark}
          />
        )}
      </ThemeContext.Consumer>
      <div className="wrapper wrapper__container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/product/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Product />
              </Suspense>
            }
          />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <ErrorPage />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default App;
