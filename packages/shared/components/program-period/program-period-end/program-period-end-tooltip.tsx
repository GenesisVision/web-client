import moment from "moment";
import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";

const _PropgramPeriodEndTooltip: React.FC<Props> = ({ t, periodEnds }) => (
  <div className="program-period-tooltip">
    <div className="program-period-tooltip__header">
      {t("program-period.period-ends")}
    </div>
    <div className="program-period-tooltip__content">
      {periodEnds
        ? moment(periodEnds).format("lll")
        : t("program-period.waiting-period-start")}
    </div>
  </div>
);

interface Props extends InjectedTranslateProps {
  periodEnds: Date;
}

const PropgramPeriodEndTooltip = React.memo(
  translate()(_PropgramPeriodEndTooltip)
);
export default PropgramPeriodEndTooltip;
