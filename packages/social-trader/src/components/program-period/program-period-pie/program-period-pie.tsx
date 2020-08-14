import { Center } from "components/center/center";
import GVProgramPeriod from "components/gv-program-period";
import { RowItem } from "components/row-item/row-item";
import { Text } from "components/text/text";
import Tooltip from "components/tooltip/tooltip";
import withLoader from "decorators/with-loader";
import * as React from "react";
import { convertDateToShortFormat, distanceDate } from "utils/dates";

import ProgramPeriodTooltip from "../program-period-tooltip/program-period-tooltip";

const _ProgramPeriodPie: React.FC<Props> = ({ start, end, className }) => {
  return (
    <Tooltip render={() => <ProgramPeriodTooltip end={end} />}>
      <Center className={className}>
        <RowItem size={"small"}>
          <GVProgramPeriod
            start={start}
            end={end}
            value={new Date()}
            variant="pie"
          />
        </RowItem>
        <RowItem>
          <Text wrap={false}>
            {convertDateToShortFormat(distanceDate(start, end))}
          </Text>
        </RowItem>
      </Center>
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
