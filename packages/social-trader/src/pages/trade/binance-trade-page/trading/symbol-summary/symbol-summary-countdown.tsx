import React, { useEffect, useState } from "react";
import { diffDate } from "utils/dates";

const COUNTDOWN_TIME = 8; // hours

interface Props {
  serverTime: number;
  nextFundingTime: Date;
}

export const SymbolSummaryCountdown: React.FC<Props> = ({
  nextFundingTime,
  serverTime
}) => {
  const [countdown, setCountdown] = useState(
    diffDate(new Date(serverTime), nextFundingTime)
  );

  useEffect(() => {
    const timerId = setInterval(() => {
      setCountdown(prevTime => {
        if (prevTime.valueOf() < 1000) {
          return prevTime
            .utc()
            .hour(COUNTDOWN_TIME)
            .minute(0)
            .second(0)
            .millisecond(0);
        }
        return prevTime.subtract(1, "second");
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, []);

  return <>{countdown.utc().format("HH:mm:ss")}</>;
};
