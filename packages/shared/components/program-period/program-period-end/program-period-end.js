import React from "react";
import { translate } from "react-i18next";
import Tooltip from "shared/components/tooltip/tooltip";

import PeriodTimeLeft from "../period-time-left";
import PropgramPeriodEndTooltip from "./program-period-end-tooltip";

const ProgramPeriodEnd = ({ t, periodEnds }) => {
  return (
    <Tooltip
      render={() => <PropgramPeriodEndTooltip periodEnds={periodEnds} />}
    >
      <div>
        <PeriodTimeLeft periodEnds={periodEnds} />
      </div>
    </Tooltip>
  );
};

export default translate()(ProgramPeriodEnd);
