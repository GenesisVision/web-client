import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { WithTranslation, withTranslation as translate } from "react-i18next";
import { formatDate } from "utils/dates";

const _PropgramPeriodEndTooltip: React.FC<Props> = ({ t, periodEnds }) => (
  <TooltipContent>
    <div className="program-period-tooltip__header">
      {t("program-period.period-ends")}
    </div>
    <div className="program-period-tooltip__content">
      {periodEnds
        ? formatDate(periodEnds)
        : t("program-period.waiting-period-start")}
    </div>
  </TooltipContent>
);

interface Props extends WithTranslation {
  periodEnds: Date;
}

const PropgramPeriodEndTooltip = React.memo(
  translate()(_PropgramPeriodEndTooltip)
);
export default PropgramPeriodEndTooltip;
