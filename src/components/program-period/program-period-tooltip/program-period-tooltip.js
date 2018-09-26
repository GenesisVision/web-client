import "./program-period-tooltip.scss";

import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

const ProgramPeriodTooltip = ({ t, start, end }) => {
  const dateNow = moment();
  const dateEnd = moment(end);

  const composeTimeLeft = () => {
    if (dateEnd < dateNow) return t("program-period.period-is-over");

    let timeLeft = [];
    const daysLeft = dateEnd.diff(dateNow, "days");
    if (daysLeft > 0)
      timeLeft.push(
        `${daysLeft} ${t("program-period.day", { count: daysLeft })}`
      );

    const hoursLeft = dateEnd.subtract(daysLeft, "days").diff(dateNow, "hours");
    if (hoursLeft > 0)
      timeLeft.push(
        `${hoursLeft} ${t("program-period.hour", {
          count: hoursLeft
        })}`
      );

    const minutesLeft = dateEnd
      .subtract(hoursLeft, "hours")
      .diff(dateNow, "minutes");
    if (minutesLeft > 0)
      timeLeft.push(
        `${minutesLeft} ${t("program-period.minute", {
          count: minutesLeft
        })}`
      );

    const secondsLeft = dateEnd
      .subtract(minutesLeft, "minutes")
      .diff(dateNow, "seconds");
    timeLeft.push(
      `${secondsLeft} ${t("program-period.second", {
        count: secondsLeft
      })}`
    );

    return timeLeft.join(" ");
  };

  return (
    <div className="program-period-tooltip">
      <div className="program-period-tooltip__header">
        {t("program-period.time-left")}
      </div>
      <div className="program-period-tooltip__content">{composeTimeLeft()}</div>
    </div>
  );
};

export default translate()(ProgramPeriodTooltip);
