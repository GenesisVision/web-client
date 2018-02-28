import { Link } from "react-router-dom";
import React from "react";

import replaceParams from "../../../../../../../utils/replace-params";

import "./ti-info.css";
import { TRADER_ROUTE } from "../../../../../traders.constants";
import avatarStub from "../../../../../../../shared/media/avatar.png";

const TIInfo = ({ trader }) => {
  const traderRoute = replaceParams(TRADER_ROUTE, {
    ":traderId": trader.id
  });
  return (
    <div className="ti-info">
      <div className="ti-info__image">
        <img src={trader.logo || avatarStub} alt="Trader Avatar" />
        <span className="badge badge-secondary ti-info__badge">
          {trader.level}
        </span>
      </div>
      <h5 className="card-title mt-4">
        <Link to={traderRoute}>{trader.title}</Link>
      </h5>
    </div>
  );
};

export default TIInfo;
