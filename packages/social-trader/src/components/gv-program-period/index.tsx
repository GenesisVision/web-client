import "./style.scss";

import classNames from "classnames";
import React from "react";

interface GVProgramPeriodProps {
  start: Date | number;
  end: Date | number;
  value: Date | number;
  variant?: "pie" | "line";
  className?: string;
  valueClassName?: string;
}

export const calcPercent = (
  value: Date | number,
  start: Date | number,
  end: Date | number
) => {
  let progress, duration;
  if (
    typeof value === "number" &&
    typeof start === "number" &&
    typeof end === "number"
  ) {
    duration = end - start;
    progress = value - start;
  } else {
    const dateNow = new Date(value).getTime();
    const dateStart = new Date(start).getTime();
    const dateEnd = new Date(end).getTime();
    duration = dateEnd - dateStart;
    progress = dateNow - dateStart;
  }

  if (duration === 0 || progress < 0) return 0;
  if (progress > duration) return 100;
  return (progress * 100) / duration;
};

const calcDash = (percent: number) => `${percent} ${100 - percent}`;

const GVProgramPeriod: React.FC<GVProgramPeriodProps> = ({
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
        width="100%"
        height="100%"
        viewBox="0 0 42 42"
        className={classNames(
          "gv-program-period",
          "gv-program-period--pie",
          className
        )}
      >
        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#2a353f"
          strokeWidth="3"
        />

        <circle
          cx="21"
          cy="21"
          r="15.91549430918954"
          fill="transparent"
          stroke="#03bdaf"
          strokeWidth="6"
          strokeDasharray={calcDash(valuePercent)}
          strokeDashoffset={25}
        />
      </svg>
    );
  else
    return (
      <div
        className={classNames(
          "gv-program-period",
          "gv-program-period--line",
          className
        )}
      >
        <div
          className={classNames("gv-program-period__value", valueClassName)}
          style={{ width: `${valuePercent}%` }}
        />
      </div>
    );
};

GVProgramPeriod.defaultProps = {
  variant: "pie"
};

export default GVProgramPeriod;
