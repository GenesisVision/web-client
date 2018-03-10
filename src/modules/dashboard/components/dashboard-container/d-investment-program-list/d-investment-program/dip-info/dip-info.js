import { Link } from "react-router-dom";
import React from "react";

import "./dip-info.css";
import { TRADER_ROUTE } from "../../../../../../trader/trader.constants";
import avatarStub from "../../../../../../../shared/media/avatar.png";

const DIPInfo = ({ program }) => {
  const traderRoute = TRADER_ROUTE.replace(":traderId", program.id);
  return (
    <div className="dip-info">
      <div className="dip-info__image">
        <img src={program.avatar || avatarStub} alt="Trader Avatar" />
        <span className="badge badge-secondary dip-info__badge">
          {program.level}
        </span>
      </div>
      <h5 className="card-title mt-4">
        <Link to={traderRoute}>{program.title}</Link>
      </h5>
    </div>
  );
};

export default DIPInfo;
