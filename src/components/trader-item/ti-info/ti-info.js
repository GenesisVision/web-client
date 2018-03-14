import React from "react";

import Progress from "../../../shared/components/progress/progress";

import "./ti-info.css";
import avatarStub from "../../../shared/media/avatar.png";

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
        <div className="ti-name__title">{trader.title}</div>
        <div className="ti-name__description">
          Replace The Negatives In Your Life With Positives And Move Your Life
          Ahead
        </div>
        <div className="ti-name__eop eop">
          <div className="eop__text">42 days left</div>
          <div className="eop__progress">
            <Progress value={42} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TIInfo;
