import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeItem, minusItem } from "../../redux/slices/cartSlice";

import "./cartitem.scss";

const CartItem = ({ id, title, addons, imageUrl, count, price, cartIndex }) => {
  const dispatch = useDispatch();

  const onClickRemove = () => {
    if (window.confirm("Remove item?")) {
      dispatch(removeItem(cartIndex));
    }
  };
  const onClickMinus = () => dispatch(minusItem(cartIndex));
  const onClickPlus = () => dispatch(addToCart({ id, addons }));

  return (
    <div className="cart-content__item cart-item">
      <div className="cart-tem__left">
        {/* link to product*/}
        <Link to={`/product/${id}`} className="cart-item__img">
          <img src={imageUrl} alt="product" />
        </Link>
        <div className="cart-item__info">
          <h3 className="cart-item__info-title">{title}</h3>
          {addons.length > 0 && (
            <p className="cart-item__info-addons">
              with: {addons.map((_) => _.title + ", ")}{" "}
            </p>
          )}
        </div>
      </div>
      <div className="cart-item__content">
        <div className="cart-item__count">
          <button
            onClick={onClickMinus}
            disabled={count === 1 ? true : false}
            className="cart-item__count-minus"
          >
            —
          </button>
          <span className="cart-item__coun-num">{count}</span>
          <button onClick={onClickPlus} className="cart-item__count-plus">
            +
          </button>
        </div>
        <div className="cart-item__price">
          <span>${(price * count).toFixed(2)}</span>
        </div>
        <div onClick={onClickRemove} className="cart-item__button">
          <button className="cart-item__button-remove">X</button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
