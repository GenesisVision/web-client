import "./pie.scss";

import classnames from "classnames";
import moment from "moment";
import React from "react";

import styles from "./pie.scss";

export interface GVProgramPeriodProps {
  pieDirection: PIE_DIRECTION;
  color: string;
  start: Date | number;
  end: Date | number;
  value: Date | number;
}

export enum PIE_DIRECTION {
  CLOCKWISE,
  COUNTERCLOCKWISE
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
  pieDirection = PIE_DIRECTION.CLOCKWISE,
  color,
  start,
  end,
  value
}) => {
  const valuePercent = calcPercent(value, start, end);
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 34 34"
      className={classnames(styles.gvProgramPeriod, styles.gvProgramPeriodPie)}
    >
      <circle
        cx="17"
        cy="17"
        r="15.91549430918954"
        fill="transparent"
        stroke={color}
        strokeOpacity={0.2}
        strokeWidth="2"
      />

      <circle
        cx="17"
        cy="17"
        r="15.91549430918954"
        fill="transparent"
        stroke={color}
        strokeWidth="2"
        strokeDasharray={calcDash(valuePercent)}
        strokeDashoffset={25}
        transform={
          pieDirection === PIE_DIRECTION.COUNTERCLOCKWISE
            ? "scale(-1, 1)  translate(-34, 0)"
            : ""
        }
      />
    </svg>
  );
};

export default Pie;
