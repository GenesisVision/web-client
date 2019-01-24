import "./pie-large.scss";

import moment from "moment";
import PropTypes from "prop-types";
import React from "react";
import { translate } from "react-i18next";

import Pie from "./pie";

const renderDurationText = (t, start, end) => {
  const dateStart = moment(start);
  const dateEnd = moment(end);
  const daysDuration = dateEnd.diff(dateStart, "days");
  if (daysDuration > 0)
    return `${daysDuration} ${t("program-period.day", {
      count: daysDuration
    })}`;

  const hoursDuration = dateEnd.diff(dateStart, "hours");
  if (hoursDuration > 0)
    return `${hoursDuration} ${t("program-period.hour", {
      count: hoursDuration
    })}`;

  const minutesDuration = dateEnd.diff(dateStart, "minutes");
  if (minutesDuration > 0)
    return `${minutesDuration} ${t("program-period.minute", {
      count: minutesDuration
    })}`;

  const secondsDuration = dateEnd.diff(dateStart, "seconds");
  return `${secondsDuration} ${t("program-period.second", {
    count: secondsDuration
  })}`;
};

const PieLarge = ({ t, start, end, value, className }) => {
  return (
    <div className="pie-container">
      <Pie start={start} end={end} value={value} />
      <div className="pie-container__value-container">
        <div className="pie-container__value">{value}%</div>
      </div>
    </div>
  );
};

PieLarge.propTypes = {
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  t: PropTypes.func.isRequired,
  className: PropTypes.string
};

export default translate()(PieLarge);
