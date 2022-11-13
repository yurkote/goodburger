import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../helpers/hooks";
import { ProductItem } from "../../pages/Product/Product";
import { addToCart } from "../../redux/slices/cartSlice";

import "./card.scss";

export type addon = {
  title: string;
  weightAddon: number;
  priceAddon: number;
};

interface CardProps {
  id: string;
  title: string;
  ingredients: string;
  imageUrl: string;
  price: number;
  weight: number;
  calories: number;
  addons: addon[];
  vege: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  title,
  ingredients,
  imageUrl,
  price,
  weight,
  calories,
  addons,
  vege,
}) => {
  const [addedAddons, setAddedAddons] = useState<addon[]>([]);
  const [displayedPrice, setDisplayedPrice] = useState<number>(price);
  const [weightProd, setWeightProd] = useState<number>(weight);
  const refAddBtn = useRef<HTMLButtonElement>(null);
  const refAddOn = useRef<Array<HTMLLIElement | null>>([]);

  const dispatch = useAppDispatch();

  const handleClickAddOn =
    (obj: addon, idx: number) => (e: React.MouseEvent<HTMLLIElement>) => {
      const ref = refAddOn.current[idx];
      if (!ref?.classList.contains("addon-active")) {
        ref?.classList.add("addon-active");
        setAddedAddons((prev) => [...prev, obj]);
        setDisplayedPrice(displayedPrice + obj.priceAddon);
        setWeightProd(weightProd + obj.weightAddon);
      } else {
        setAddedAddons((prev) => prev.filter((el) => el.title !== obj.title));
        setDisplayedPrice(displayedPrice - obj.priceAddon);
        setWeightProd(weightProd - obj.weightAddon);
        ref.classList.remove("addon-active");
      }
    };
  const addToCartHandler = () => {
    const addedList = refAddOn.current.filter(
      (item) => item?.classList.contains("addon-active") === true
    );
    const obj = {
      id,
      title,
      ingredients,
      imageUrl,
      price: displayedPrice,
      addons: addedAddons,
    };
    const btn = refAddBtn.current;
    btn?.classList.add("card-button__added");
    setDisplayedPrice(price);
    setWeightProd(weight);
    dispatch(addToCart(obj as ProductItem));
    addedList.forEach((item) => item?.classList.remove("addon-active"));
    const anim = btn?.animate([], { duration: 1000 });
    setAddedAddons([]);
    anim?.addEventListener("finish", function () {
      btn?.classList.remove("card-button__added");
    });
  };
  return (
    <div className="card">
      <div className="card-img">
        {vege && (
          <div className="card-vege">
            <span>vege</span>
          </div>
        )}
        <Link to={`/product/${id}`}>
          <img src={imageUrl} alt={title} className="image-card" />
          <div className="card-info info">
            <span className="info-kkal">~{calories}Kcal</span>
            <span className="info-weight">{weightProd}g</span>
          </div>
        </Link>
      </div>
      <h2 className="card-title">
        <span>{title}</span>
      </h2>
      <div className="card-addons-box">
        <p className="addons-descr">Choose the addons:</p>
        <ul className="addons-list">
          {addons.map((item, i) => {
            return (
              <li
                ref={(el) => (refAddOn.current[i] = el)}
                onClick={handleClickAddOn(item, i)}
                className="addons-item"
                key={item.title}
              >
                <span>{`${item.title}`}</span>
                <span>${item.priceAddon.toFixed(2)}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="card-footer">
        <div className="card-price">
          <span>${displayedPrice.toFixed(2)}</span>
        </div>
        <div className="card-button-box">
          <button
            ref={refAddBtn}
            onClick={addToCartHandler}
            className="card-button"
          >
            <span>Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
