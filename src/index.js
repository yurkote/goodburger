import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "./pages/error";
import Cart from "./pages/Cart/Cart";
import Product from "./pages/Product/Product";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    caseSensitive: "cart/",
    element: <Cart />,
  },
  {
    path: "product/:id",
    element: <Product />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
