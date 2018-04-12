import { Link } from "react-router-dom";
import React from "react";

import { TRADER_ROUTE } from "../../../modules/trader/trader.constants";
import replaceParams from "../../../utils/replace-params";

import "./pi-buttons.css";

const PIButtons = ({
  isAuthenticated,
  traderId,
  isInvestEnable,
  openInvestPopup
}) => {
  const traderRoute = replaceParams(TRADER_ROUTE, {
    ":traderId": traderId
  });
  return (
    <div className="pi-buttons">
      <Link className="pi-button gv-btn gv-btn-secondary" to={traderRoute}>
        View Profile
      </Link>
      {isAuthenticated && (
        <button
          className="pi-button gv-btn gv-btn-primary"
          onClick={openInvestPopup(traderId)}
          disabled={!isInvestEnable}
        >
          Invest
        </button>
      )}
    </div>
  );
};

export default PIButtons;
