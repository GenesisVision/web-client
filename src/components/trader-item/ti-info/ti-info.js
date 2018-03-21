import React from "react";

import DaysLeftWidget from "../../days-left-widget/days-left-widget";
import TraderAvatar from "../../trader-avatar/trader-avatar";

import "./ti-info.css";

const TIInfo = ({ idx, trader }) => {
  return (
    <div className="ti-info">
      <div className="ti-info__order">{idx}</div>
      <div className="ti-info__image">
        <TraderAvatar imgUrl={trader.logo} level={trader.level} />
      </div>
      <div className="ti-info__name ti-name">
        <div className="ti-name__title">{trader.title}</div>
        <div className="ti-name__description">{trader.description}</div>
        <div className="ti-name__eop">
          <DaysLeftWidget
            start={trader.startOfPeriod}
            duration={trader.periodDuration}
          />
        </div>
      </div>
    </div>
  );
};

export default TIInfo;
