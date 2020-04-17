import GVProgramPeriod from "components/gv-program-period";
import { RowItem } from "components/row-item/row-item";
import { Row } from "components/row/row";
import Tooltip from "components/tooltip/tooltip";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { convertDateToShortFormat, distanceDate } from "utils/dates";

import ProgramPeriodTooltip from "../program-period-tooltip/program-period-tooltip";
import "./program-period-pie.scss";

const _ProgramPeriodPie: React.FC<Props> = ({ start, end, className }) => {
  return (
    <Tooltip render={() => <ProgramPeriodTooltip end={end} />}>
      <Row wide className={className}>
        <RowItem small>
          <GVProgramPeriod
            start={start}
            end={end}
            value={new Date()}
            variant="pie"
          />
        </RowItem>
        <RowItem className="program-period-pie__text">
          {convertDateToShortFormat(distanceDate(start, end))}
        </RowItem>
      </Row>
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
