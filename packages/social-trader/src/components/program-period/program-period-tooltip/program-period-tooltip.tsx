import StatisticItem from "components/statistic-item/statistic-item";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";

import PeriodTimeLeft from "../period-time-left";

const _ProgramPeriodTooltip: React.FC<Props> = ({ end }) => {
  const [t] = useTranslation();
  return (
    <TooltipContent>
      <StatisticItem
        withPadding={false}
        accent
        label={t("program-period.time-left")}
      >
        <PeriodTimeLeft periodEnds={end} />
      </StatisticItem>
    </TooltipContent>
  );
};

interface Props {
  end: Date;
}

const ProgramPeriodTooltip = React.memo(_ProgramPeriodTooltip);
export default ProgramPeriodTooltip;
