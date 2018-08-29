import "./time-left-widget.css";

import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

import Progress from "../../../shared/components/progress/progress";

const TimeLeftWidget = ({ t, start, end, className }) => {
  const dateNow = moment();
  const dateStart = moment(start);
  const dateEnd = moment(end);

  const duration = dateEnd.diff(moment(dateStart), "seconds");

  const secondsPassed = () => {
    return dateNow.diff(dateStart, "seconds");
  };

  const renderTimeLeftText = () => {
    if (dateEnd < dateNow) return t("time-left-widget.end-less-than-now");

    const daysLeft = dateEnd.diff(dateNow, "days");
    if (daysLeft > 0)
      return `${daysLeft} ${t("time-left-widget.day", { count: daysLeft })}`;

    const hoursLeft = dateEnd.diff(dateNow, "hours");
    if (hoursLeft > 0)
      return `${hoursLeft} ${t("time-left-widget.hour", {
        count: hoursLeft
      })}`;

    const minutesLeft = dateEnd.diff(dateNow, "minutes");
    if (minutesLeft > 0)
      return `${minutesLeft} ${t("time-left-widget.minute", {
        count: minutesLeft
      })}`;

    const secondsLeft = dateEnd.diff(dateNow, "seconds");
    return `${secondsLeft} ${t("time-left-widget.second", {
      count: secondsLeft
    })}`;
  };

  return (
    <div className={classnames("time-left-widget", className)}>
      <div className="time-left-widget__progress">
        <Progress value={secondsPassed()} max={duration} />
      </div>
      <div className="time-left-widget__text">{renderTimeLeftText()}</div>
    </div>
  );
};

TimeLeftWidget.propTypes = {
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  t: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default translate()(TimeLeftWidget);
