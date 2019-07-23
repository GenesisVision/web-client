import "./program-period-tooltip.scss";

import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";

import PeriodTimeLeft from "../period-time-left";

const _ProgramPeriodTooltip: React.FC<Props> = ({ t, end }) => (
  <div className="program-period-tooltip">
    <div className="program-period-tooltip__header">
      {t("program-period.time-left")}
    </div>
    <div className="program-period-tooltip__content">
      <PeriodTimeLeft periodEnds={end} />
    </div>
  </div>
);

interface Props extends WithTranslation {
  end: Date;
}

const ProgramPeriodTooltip = translate()(React.memo(_ProgramPeriodTooltip));
export default ProgramPeriodTooltip;
