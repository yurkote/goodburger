import React, { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import SortBar from "./components/SortBar/SortBar";
import Content from "./components/Content/Content";
import { Outlet } from "react-router-dom";
import axios from "axios";

import "./app.scss";

const App = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        axios("https://633770b95327df4c43d42ba8.mockapi.io/dishes").then(
          (response) => {
            setCards(response.data);
            setLoading(false);
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
        <Outlet />
        <Header search />
        <SortBar />
        <Content cards={cards} loading={loading} />
      </div>
    </>
  );
};

export default App;
