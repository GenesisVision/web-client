import { Link } from "react-router-dom";
import React from "react";

import replaceParams from "../../../../../../../utils/replace-params";

import "./ti-info.css";
import { TRADER_ROUTE } from "../../../../../traders.constants";
import avatarStub from "../../../../../../../shared/media/avatar.png";

const TIInfo = ({ idx, trader }) => {
  return (
    <div className="ti-info">
      <div className="ti-info__order">{idx}</div>
      <div className="ti-info__image">
        <img
          className="ti-image"
          src={trader.logo || avatarStub}
          alt="Trader Avatar"
        />
        <span className="ti-image__badge">{trader.level}</span>
      </div>
      <div className="ti-info__name ti-name">
        <h5 className="ti-name__title">{trader.title}</h5>
        <p className="ti-name__description">
          Replace The Negatives In Your Life With Positives And Move Your Life
          Ahead
        </p>
        <p className="ti-name__eop">42 days left</p>
      </div>
    </div>
  );
};

export default TIInfo;
