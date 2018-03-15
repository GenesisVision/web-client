import moment from "moment";
import React from "react";

import Progress from "../../../shared/components/progress/progress";
import TraderAvatar from "../../trader-avatar/trader-avatar";

import "./ti-info.css";

const TIInfo = ({ idx, trader }) => {
  const dateNow = moment(new Date());

  const daysPassed = startOfPeriod => {
    const startDate = moment(startOfPeriod);
    return dateNow.diff(startDate, "days");
  };
  const daysLeft = (startOfPeriod, periodDuration) => {
    return periodDuration - daysPassed(startOfPeriod);
  };
  return (
    <div className="ti-info">
      <div className="ti-info__order">{idx}</div>
      <div className="ti-info__image">
        <TraderAvatar imgUrl={trader.logo} level={trader.level} />
      </div>
      <div className="ti-info__name ti-name">
        <div className="ti-name__title">{trader.title}</div>
        <div className="ti-name__description">
          Replace The Negatives In Your Life With Positives And Move Your Life
          Ahead
        </div>
        <div className="ti-name__eop eop">
          <div className="eop__text">
            {daysLeft(trader.startOfPeriod, trader.periodDuration)} days left
          </div>
          <div className="eop__progress">
            <Progress
              value={daysPassed(trader.startOfPeriod)}
              max={trader.periodDuration}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TIInfo;
