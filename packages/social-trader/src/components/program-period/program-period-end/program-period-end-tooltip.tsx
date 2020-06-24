import { LabeledValue } from "components/labeled-value/labeled-value";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { formatDate } from "utils/dates";

const _PropgramPeriodEndTooltip: React.FC<Props> = ({ periodEnds }) => {
  const [t] = useTranslation();
  return (
    <TooltipContent>
      <LabeledValue label={t("program-period.period-ends")}>
        {periodEnds
          ? formatDate(periodEnds)
          : t("program-period.waiting-period-start")}
      </LabeledValue>
    </TooltipContent>
  );
};

interface Props {
  periodEnds: Date;
}

const PropgramPeriodEndTooltip = React.memo(_PropgramPeriodEndTooltip);
export default PropgramPeriodEndTooltip;
