import "./program-period-tooltip.scss";

import React from "react";
import { translate } from "react-i18next";

import PeriodTimeLeft from "../period-time-left";

const ProgramPeriodTooltip = ({ t, end }) => {
  return (
    <div className="program-period-tooltip">
      <div className="program-period-tooltip__header">
        {t("program-period.time-left")}
      </div>
      <div className="program-period-tooltip__content">
        <PeriodTimeLeft periodEnds={end} />
      </div>
    </div>
  );
};

export default translate()(ProgramPeriodTooltip);
