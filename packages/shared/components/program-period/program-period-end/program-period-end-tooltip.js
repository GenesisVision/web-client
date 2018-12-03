import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

const PropgramPeriodEndTooltip = ({ t, periodEnds }) => {
  const renderTime = () => {
    if (!periodEnds) {
      return t("program-period.waiting-period-start");
    }
    return moment(periodEnds).format("lll");
  };
  return (
    <div className="program-period-tooltip">
      <div className="program-period-tooltip__header">
        {t("program-period.period-ends")}
      </div>
      <div className="program-period-tooltip__content">{renderTime()}</div>
    </div>
  );
};

export default translate()(PropgramPeriodEndTooltip);
