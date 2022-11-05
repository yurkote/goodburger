import { useEffect, useRef } from "react";
import Cart from "./pages/Cart/Cart";
import Home from "./pages/Home/Home";
import Product from "./pages/Product/Product";
import { Route, Routes, useSearchParams } from "react-router-dom";
import ErrorPage from "./pages/Error";
import "./app.scss";
import { useDebounce } from "use-lodash-debounce";
import { sortVariant } from "./components/SortBar/SortBar";
import { setParamsToState } from "./redux/slices/sortSlice";
import { fetchProducts } from "./redux/slices/productsSlice";
import { useAppDispatch, useAppSelector } from "./helpers/hooks";

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
      <div className="wrapper wrapper__container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
