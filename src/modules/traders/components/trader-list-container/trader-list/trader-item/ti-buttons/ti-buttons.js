import { Link } from "react-router-dom";
import React from "react";

import replaceParams from "../../../../../../../utils/replace-params";

import "./ti-buttons.css";
import { TRADER_ROUTE } from "../../../../../traders.constants";

const TIButtons = ({ traderId }) => {
  const traderRoute = replaceParams(TRADER_ROUTE, {
    ":traderId": traderId
  });
  return (
    <div className="ti-buttons">
      <Link className="ti-button btn btn-outline-primary" to={traderRoute}>
        View Profile
      </Link>
      <button className="ti-button btn btn-outline-secondary">Invest</button>
    </div>
  );
};

export default TIButtons;
