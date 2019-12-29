import classNames from "classnames";
import React from "react";
import { TAdvantages } from "routes/ssr/landing-page/static-data/advantages";

const _AdvantageItem: React.FC<TAdvantages> = ({ text, title, image }) => (
  <li className="advantages-list__item">
    {image && (
      <img src={image} alt={title} className="advantages-list__item-image" />
    )}
    <div className="advantages-list__item-title">{title}</div>
    <p className="advantages-list__item-text">{text}</p>
  </li>
);
const AdvantageItem = React.memo(_AdvantageItem);
export default AdvantageItem;
