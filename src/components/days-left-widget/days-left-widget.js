import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

import Progress from "../../shared/components/progress/progress";

import "./days-left-widget.css";

const DaysLeftWidget = ({ t, start, end, duration }) => {
  const dateNow = moment();
  const startDate = moment(start);

  const periodDuration = duration
    ? duration
    : startDate.diff(moment(end), "days");

  const daysPassed = () => {
    return dateNow.diff(startDate, "days");
  };
  const daysLeft = () => {
    return periodDuration - daysPassed();
  };
  const days = daysLeft();
  return (
    <div className="days-left-widget">
      <div className="days-left-widget__text">{days} {t("days-left-widget.text", { count: days })}</div>
      <div className="days-left-widget__progress">
        <Progress value={daysPassed()} max={periodDuration} />
      </div>
    </div>
  );
};

export default translate()(DaysLeftWidget);
