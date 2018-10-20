import moment from "moment";
import React from "react";
import { translate } from "react-i18next";

const PropgramPeriodEndTooltip = ({ t, periodEnds }) => {
  return (
    <div className="program-period-tooltip">
      <div className="program-period-tooltip__header">
        {t("program-period.period-ends")}
      </div>
      <div className="program-period-tooltip__content">
        {moment(periodEnds).format("lll")}
      </div>
    </div>
  );
};

export default translate()(PropgramPeriodEndTooltip);
