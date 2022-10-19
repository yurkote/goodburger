import React from "react";
import ContentLoader from "react-content-loader";
import "./content.scss";

const CardLoader = () => (
  <ContentLoader
    className="card"
    speed={1}
    width={496}
    height={696}
    viewBox="0 0 496 696"
    backgroundColor="#696969"
    foregroundColor="#808080"
  >
    <rect x="32" y="12" rx="0" ry="0" width="0" height="59" />
    <rect x="573" y="549" rx="0" ry="0" width="44" height="28" />
    <rect x="3" y="0" rx="10" ry="10" width="490" height="300" />
    <rect x="3" y="310" rx="10" ry="10" width="490" height="55" />
    <rect x="15" y="380" rx="10" ry="10" width="150" height="30" />
    <rect x="10" y="430" rx="10" ry="10" width="225" height="50" />
    <rect x="265" y="430" rx="10" ry="10" width="225" height="50" />
    <rect x="10" y="490" rx="10" ry="10" width="225" height="50" />
    <rect x="265" y="490" rx="10" ry="10" width="225" height="50" />
    <rect x="-10" y="610" rx="10" ry="10" width="140" height="50" />
    <rect x="362" y="610" rx="10" ry="10" width="140" height="50" />
  </ContentLoader>
);

export default CardLoader;
