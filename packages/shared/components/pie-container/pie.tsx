import * as React from "react";

const Pie: React.FC<Props> = ({
  pieDirection = PIE_DIRECTION.CLOCKWISE,
  color,
  start = 0,
  end,
  value
}) => {
  const valuePercent = calcPercent(value, start, end);
  return (
    <svg width="100%" height="100%" viewBox="0 0 34 34">
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

export enum PIE_DIRECTION {
  CLOCKWISE = "CLOCKWISE",
  COUNTERCLOCKWISE = "COUNTERCLOCKWISE"
}

export interface Props {
  color: string;
  end: Date | number;
  value: Date | number;
  start?: Date | number;
  pieDirection?: PIE_DIRECTION;
}

export default React.memo(Pie);
