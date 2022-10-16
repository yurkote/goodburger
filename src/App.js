import React from "react";
import Header from "./components/Header/Header";
import SortBar from "./components/SortBar/SortBar";
import Content from "./components/Content/Content";

import "./app.scss";

const App = () => {
  return (
    <>
      <div className="wrapper wrapper__container">
        <Header />
        <SortBar />
        <Content />
      </div>
    </>
  );
};

export default App;
