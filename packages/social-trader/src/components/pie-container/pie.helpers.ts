export type CircleDataType = {
  name?: string;
  color: string;
  begin?: number;
  end: Date | number;
  start?: Date | number;
  value: Date | number;
};

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

export const calcDash = (percent: number) => `${percent} ${100 - percent}`;
