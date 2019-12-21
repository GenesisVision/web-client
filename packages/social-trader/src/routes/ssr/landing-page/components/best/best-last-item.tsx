import React from "react";
import LPButton from "routes/ssr/landing-page/components/lp-button/lp-button";
import LogoIcon from "routes/ssr/landing-page/images/logos/logo.svg";

const BestLastItem: React.FC = () => (
  <li className="best-list__item best-list__item--last">
    <div className="best-list__item-avatar">
      <img
        className="best-list__item-image"
        src={LogoIcon}
        alt="Genesis Vision"
      />
    </div>
    <div className="best-list__item-info">
      <div className="best-list__item-title">Genesis Vision</div>
    </div>
    <div className="best-list__item-button">
      <LPButton href="/">Discover</LPButton>
    </div>
  </li>
);
export default BestLastItem;
