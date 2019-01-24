import "./pie.scss";

import classnames from "classnames";
import moment from "moment";
import PropTypes from "prop-types";
import React from "react";

import * as GVColors from "./colors";
import styles from "./pie.scss";

export interface GVProgramPeriodProps {
  start: Date | number;
  end: Date | number;
  value: Date | number;
  variant: string;
  className?: string;
  valueClassName?: string;
}

export const calcPercent = (
  value: Date | number,
  start: Date | number,
  end: Date | number
) => {
  let progress = 0,
    duration = 0;
  if (
    typeof value === "number" &&
    typeof start === "number" &&
    typeof end === "number"
  ) {
    duration = end - start;
    progress = value - start;
  } else {
    const dateNow = moment(value);
    const dateStart = moment(start);
    const dateEnd = moment(end);
    duration = dateEnd.diff(moment(dateStart), "seconds");
    progress = dateNow.diff(dateStart, "seconds");
  }

  if (duration === 0 || progress < 0) return 0;
  if (progress > duration) return 100;
  return (progress * 100) / duration;
};

const calcDash = (percent: number) => `${percent} ${100 - percent}`;

const Pie: React.SFC<GVProgramPeriodProps> = ({
  start,
  end,
  value,
  variant,
  className,
  valueClassName
}) => {
  const valuePercent = calcPercent(value, start, end);
  if (variant === "pie")
    return (
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        className={classnames(
          styles.gvProgramPeriod,
          styles.gvProgramPeriodPie,
          className
        )}
      >
        <circle
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          stroke="#2a353f"
          strokeWidth="2"
        />

        <circle
          cx="20"
          cy="20"
          r="15.91549430918954"
          fill="transparent"
          stroke={GVColors.$primaryColor}
          strokeWidth="2"
          strokeDasharray={calcDash(valuePercent)}
          strokeDashoffset={25}
        />
      </svg>
    );
  else
    return (
      <div
        className={classnames(
          styles.gvProgramPeriod,
          styles.gvProgramPeriodLine,
          className
        )}
      >
        <div
          className={classnames(styles.gvProgramPeriodValue, valueClassName)}
          style={{ width: `${valuePercent}%` }}
        />
      </div>
    );
};

Pie.propTypes = {
  value: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])
    .isRequired,
  start: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])
    .isRequired,
  end: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.number])
    .isRequired,
  variant: PropTypes.oneOf(["pie", "line"]),
  className: PropTypes.string,
  valueClassName: PropTypes.string
};

Pie.defaultProps = {
  variant: "pie"
};

export default Pie;
