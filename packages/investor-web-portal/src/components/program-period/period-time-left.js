import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

export const PeriodTimeLeft = ({ t, periodEnds, className }) => {
  const now = moment();
  const periodEndsMoment = moment(periodEnds);
  const renderTimeLeft = () => {
    if (!periodEnds) {
      return null;
    }
    if (now.isAfter(periodEndsMoment)) {
      return t("program-period.period-is-over");
    }

    return periodEndsMoment.from(now, true);
  };

  return <div className={className}>{renderTimeLeft()}</div>;
};

export default translate()(PeriodTimeLeft);
