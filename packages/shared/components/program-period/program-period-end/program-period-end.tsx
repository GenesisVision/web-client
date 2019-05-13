import * as React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { compose } from "redux";
import Tooltip from "shared/components/tooltip/tooltip";

import PeriodTimeLeft from "../period-time-left";
import PropgramPeriodEndTooltip from "./program-period-end-tooltip";

const _ProgramPeriodEnd: React.FC<Props> = ({ t, periodEnds }) => (
  <Tooltip render={() => <PropgramPeriodEndTooltip periodEnds={periodEnds} />}>
    <div>
      <PeriodTimeLeft periodEnds={periodEnds} />
    </div>
  </Tooltip>
);

interface Props extends InjectedTranslateProps,OwnProps {
}
interface OwnProps {
  periodEnds: Date;
}

const ProgramPeriodEnd = compose<React.ComponentType<OwnProps>>(
  React.memo,
  translate()
)(_ProgramPeriodEnd);
export default ProgramPeriodEnd;
