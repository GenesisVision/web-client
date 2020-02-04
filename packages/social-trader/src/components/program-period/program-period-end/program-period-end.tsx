import Tooltip from "components/tooltip/tooltip";
import * as React from "react";
import { compose } from "redux";

import PeriodTimeLeft from "../period-time-left";
import PropgramPeriodEndTooltip from "./program-period-end-tooltip";

const _ProgramPeriodEnd: React.FC<Props> = ({ periodEnds }) => (
  <Tooltip render={() => <PropgramPeriodEndTooltip periodEnds={periodEnds} />}>
    <div>
      <PeriodTimeLeft periodEnds={periodEnds} />
    </div>
  </Tooltip>
);

interface Props extends OwnProps {}
interface OwnProps {
  periodEnds: Date;
}

const ProgramPeriodEnd = compose<React.ComponentType<OwnProps>>(React.memo)(
  _ProgramPeriodEnd
);
export default ProgramPeriodEnd;
