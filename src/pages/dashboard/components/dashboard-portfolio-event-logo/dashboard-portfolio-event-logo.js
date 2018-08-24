import "./dashboard-portfolio-event-logo.scss";

import classnames from "classnames";
import React from "react";

const PortfolioEventLogo = ({ isPositive, type }) => {
  const className = classnames("portfolio-event", {
    "portfolio-event--positive": isPositive,
    "portfolio-event--negative": !isPositive
  });

  const typeClassName = classnames("portfolio-event-logo__type", {
    "portfolio-event-logo__type--profit": isPositive && type === "",
    "portfolio-event-logo__type--lose": !isPositive && type === "",
    "portfolio-event-logo__type--reinvest": type === ""
  });

  return (
    <div className={className}>
      <div className="portfolio-event-logo__photo">P</div>
      <div className={typeClassName}>T</div>
    </div>
  );
};

export default PortfolioEventLogo;
