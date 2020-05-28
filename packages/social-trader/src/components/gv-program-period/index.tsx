import classNames from "classnames";
import { calcPercent } from "components/pie-container/pie.helpers";
import React from "react";

import styles from "./style.module.scss";

interface GVProgramPeriodProps {
  start: Date | number;
  end: Date | number;
  value: Date | number;
  variant?: "pie" | "line";
  className?: string;
  valueClassName?: string;
}

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
          styles["gv-program-period"],
          styles["gv-program-period--pie"],
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
          styles["gv-program-period"],
          styles["gv-program-period--line"],
          className
        )}
      >
        <div
          className={classNames(
            styles["gv-program-period__value"],
            valueClassName
          )}
          style={{ width: `${valuePercent}%` }}
        />
      </div>
    );
};

GVProgramPeriod.defaultProps = {
  variant: "pie"
};

export default GVProgramPeriod;
