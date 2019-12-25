import classNames from "classnames";
import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import { TAdvantages } from "routes/ssr/landing-page/static-data/advantages";

const _AdvantageItem: React.FC<TAdvantages> = ({ text, title, image }) => (
  <li className="advantages-list__item">
    <img src={image} alt="" className="advantages-list__item-image" />
    <div className="advantages-list__item-subtitle">{title}</div>
    <div className="advantages-list__item-text">{text}</div>
    {/*{button && (*/}
    {/*  <div className="advantages-list__item-btn">*/}
    {/*    <LPButton href={button.link}>{button.text}</LPButton>*/}
    {/*  </div>*/}
    {/*)}*/}
  </li>
);
const AdvantageItem = React.memo(_AdvantageItem);
export default AdvantageItem;
