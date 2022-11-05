import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { addon } from "../../components/Card/Card";
import Header from "../../components/Header/Header";
import { dataUrl } from "../../helpers/linkData";
import "./product.scss";

export type ProductItem = {
  addons : addon[];
  calories: number;
  category: number;
  id: string;
  imageUrl: string;
  ingredients: string;
  price: number;
  rating: number;
  title: string;
  vege: boolean;
  weight: number;
}

const Product = () => {
  const [product, setProduct] = useState<ProductItem>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function productData() {
      try {
        const { data } = await axios(dataUrl + "/" + id);
        setProduct(data);
      } catch (error) {
        alert("Something was wrong, you'll redirect to main page");
        navigate("/");
      }
    }
    productData();
  }, []);

  if (!product) {
    return <>is loading...</>;
  }

  return (
    <>
      <Header cartBtn />
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <circle cx="8" cy="20" r="2"></circle>
        <circle cx="18" cy="20" r="2"></circle>
        <path d="M19 17H7a1 1 0 01-1-.78L3.2 4H2a1 1 0 010-2h2a1 1 0 011 .78L7.8 15h10.4L20 6.78a1 1 0 012 .44l-2 9a1 1 0 01-1 .78z"></path>
        <path d="M16 6h-2V4a1 1 0 00-2 0v2h-2a1 1 0 000 2h2v2a1 1 0 002 0V8h2a1 1 0 000-2z"></path>
      </svg> */}
      <section className="product">
        <div className="product__img">
          <img src={product.imageUrl} alt="product" />
          {product.vege && (
            <div className="product-vege">
              <span>vege</span>
            </div>
          )}
        </div>
        <div className="product__content prd-cnt">
          <div className="prd-cnt__title">
            <h1>{product.title}</h1>
            <Link className="prd-cnt__back-button--link" to={"/"}>
              <button className="prd-cnt__back-button">
                Back to main page
              </button>
            </Link>
          </div>
          <div className="prd-cnt__descr">
            <p>
              <span>Ingredients: </span>
              {product.ingredients}
            </p>
            <p>
              <span>Energy: </span>
              {product.calories}kcal
            </p>
            <p>
              <span>Weight: </span>
              {product.weight}gr
            </p>
          </div>
          <div className="prd-cnt__addons prd-addons">
            <p className="prd-addons__title">Available addons:</p>
            <ul className="prd-addons__items">
              {product.addons.map((item, i) => {
                return (
                  <li key={i} className="prd-addons__item">
                    <h3>{item.title}</h3>
                    <p>
                      {item.weightAddon}gr
                      <span>${item.priceAddon}</span>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="prd-footer">
            <div className="prd-footer__price">
              <p>{product.title} price:</p>
              <span> ${product.price}</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Product;
