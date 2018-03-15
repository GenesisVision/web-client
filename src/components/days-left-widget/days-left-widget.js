import moment from "moment";
import React from "react";

import Progress from "../../shared/components/progress/progress";

import "./days-left-widget.css";

const DaysLeftWidget = ({ start, end, duration }) => {
  const dateNow = moment(new Date());
  const startDate = moment(start);

  const periodDuration = duration
    ? duration
    : startDate.diff(moment(end, "days"));

  const daysPassed = () => {
    const startDate = moment(start);
    return dateNow.diff(startDate, "days");
  };
  const daysLeft = () => {
    return periodDuration - daysPassed(start);
  };
  return (
    <div className="days-left-widget">
      <div className="days-left-widget__text">{daysLeft()} Days left</div>
      <div className="days-left-widget__progress">
        <Progress value={daysPassed()} max={periodDuration} />
      </div>
    </div>
  );
};

export default DaysLeftWidget;
