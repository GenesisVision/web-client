import "./dashboard-portfolio-event-logo.scss";

import classnames from "classnames";
import React from "react";

import icons from "./icons";

export const logoTypes = {
  PROFIT: "PROFIT",
  LOSE: "LOSE",
  REINVEST: "REINVEST"
};

const getTypeSVG = type => {
  switch (type) {
    case logoTypes.PROFIT:
      return icons.EventProfitIcon;
    case logoTypes.LOSE:
      return icons.EventLoseIcon;
    case logoTypes.REINVEST:
      return icons.EventReinvestIcon;
    default:
      return null;
  }
};

const PortfolioEventLogo = ({ isPositive, type }) => {
  const className = classnames("portfolio-event-logo", {
    "portfolio-event-logo--positive": isPositive,
    "portfolio-event-logo--negative": !isPositive
  });

  const TypeSVG = getTypeSVG(type);

  return (
    <div className={className}>
      <div className="portfolio-event-logo__photo">P</div>
      <div className={"portfolio-event-logo__type"}>
        <TypeSVG />
      </div>
    </div>
  );
};

export default PortfolioEventLogo;
