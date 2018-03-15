import { Link } from "react-router-dom";
import React from "react";

import { TRADER_ROUTE } from "../../../modules/trader/trader.constants";
import replaceParams from "../../../utils/replace-params";

import "./ti-buttons.css";

const TIButtons = ({ traderId, openInvestPopup }) => {
  const traderRoute = replaceParams(TRADER_ROUTE, {
    ":traderId": traderId
  });
  return (
    <div className="ti-buttons">
      <Link className="ti-button gv-btn gv-btn-secondary" to={traderRoute}>
        View Profile
      </Link>
      <button
        className="ti-button gv-btn gv-btn-primary"
        onClick={openInvestPopup(traderId)}
      >
        Invest
      </button>
    </div>
  );
};

export default TIButtons;
