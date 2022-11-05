import React from "react";
import Content from "../../components/Content/Content";
import Header from "../../components/Header/Header";
import SortBar from "../../components/SortBar/SortBar";

const Home: React.FC = () => {
  return (
    <>
      <Header search cartBtn />
      <SortBar />
      <Content />
    </>
  );
};

export default Home;
