import React from "react";

import "./trader-info.css";
import avatarStub from "../../../../../../shared/media/avatar.png";

const TraderInfo = ({ trader }) => {
  return (
    <div className="row trader-info">
      <div className="col-md-1 trader-info__img">
        <img src={trader.logo || avatarStub} alt="Trader Avatar" />
        <span className="badge badge-secondary ti-info__badge">
          {trader.level}
        </span>
      </div>
      <div className="col-md-10 offset-md-1">{trader.description}</div>
    </div>
  );
};

export default TraderInfo;
