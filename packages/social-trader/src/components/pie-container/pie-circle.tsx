import classNames from "classnames";
import { PIE_DIRECTION } from "components/pie-container/pie";
import * as React from "react";

import styles from "./pie-container.module.scss";

export const PieCircle: React.FC<IPieCircleProps> = React.memo(
  ({
    selected,
    onMouseLeave,
    onMouseOver,
    circleCenter,
    color,
    strokeDasharray,
    begin,
    pieDirection,
    circleSize
  }) => {
    return (
      <circle
        className={classNames(styles["pie-circle"], {
          [styles["pie-circle--selected"]]: selected
        })}
        onMouseLeave={onMouseLeave}
        onMouseEnter={onMouseOver}
        cx={circleCenter}
        cy={circleCenter}
        r="15.91549430918954"
        fill={"none"}
        stroke={color}
        strokeWidth="2"
        strokeDasharray={strokeDasharray}
        strokeDashoffset={25}
        transform={`rotate(${begin},${circleCenter},${circleCenter})${
          pieDirection === PIE_DIRECTION.COUNTERCLOCKWISE
            ? ` scale(-1, 1)  translate(-${circleSize}, 0)`
            : ""
        }`}
      />
    );
  }
);

interface IPieCircleProps {
  selected?: boolean;
  onMouseLeave?: VoidFunction;
  onMouseOver?: VoidFunction;
  circleCenter: number;
  color: string;
  strokeDasharray: string;
  begin?: number;
  pieDirection?: PIE_DIRECTION;
  circleSize: number;
}
