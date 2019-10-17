import "./program-period-pie.scss";

import classNames from "classnames";
import * as React from "react";
import GVProgramPeriod from "shared/components/gv-program-period";
import Tooltip from "shared/components/tooltip/tooltip";
import withLoader from "shared/decorators/with-loader";
import { distanceDate } from "shared/utils/dates";

import ProgramPeriodTooltip from "../program-period-tooltip/program-period-tooltip";

const _ProgramPeriodPie: React.FC<Props> = ({ start, end, className }) => {
  return (
    <Tooltip render={() => <ProgramPeriodTooltip end={end} />}>
      <div className={classNames("program-period-pie", className)}>
        <GVProgramPeriod
          start={start}
          end={end}
          value={new Date()}
          variant="pie"
        />
        <div className="program-period-pie__text">
          {distanceDate(start, end)}
        </div>
      </div>
    </Tooltip>
  );
};

interface Props {
  start: Date;
  end: Date;
  className?: string;
}

const ProgramPeriodPie = withLoader(React.memo(_ProgramPeriodPie));
export default ProgramPeriodPie;
