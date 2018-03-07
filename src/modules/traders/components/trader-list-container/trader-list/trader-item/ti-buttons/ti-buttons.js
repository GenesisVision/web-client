import { Link } from "react-router-dom";
import React from "react";

import replaceParams from "../../../../../../../utils/replace-params";

import { TRADER_ROUTE } from "../../../../../traders.constants";

const TIButtons = ({ traderId }) => {
  const traderRoute = replaceParams(TRADER_ROUTE, {
    ":traderId": traderId
  });
  return (
    <div className="ti-buttons">
      <Link className="btn" to={traderRoute}>
        View
      </Link>
    </div>
  );
};

export default TIButtons;
