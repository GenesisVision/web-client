import { LabeledValue } from "components/labeled-value/labeled-value";
import { Text } from "components/text/text";
import { TooltipContent } from "components/tooltip/tooltip-content";
import * as React from "react";
import { useTranslation } from "react-i18next";

import PeriodTimeLeft from "../period-time-left";

const _ProgramPeriodTooltip: React.FC<Props> = ({ end }) => {
  const [t] = useTranslation();
  return (
    <TooltipContent>
      <LabeledValue label={t("program-period.time-left")}>
        <Text weight={"bold"}>
          <PeriodTimeLeft periodEnds={end} />
        </Text>
      </LabeledValue>
    </TooltipContent>
  );
};

interface Props {
  end: Date;
}

const ProgramPeriodTooltip = React.memo(_ProgramPeriodTooltip);
export default ProgramPeriodTooltip;
