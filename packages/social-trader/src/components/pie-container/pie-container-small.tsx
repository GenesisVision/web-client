import { Center } from "components/center/center";
import { RowItem } from "components/row-item/row-item";
import * as React from "react";

import GVProgramPeriod from "../gv-program-period";
import "./pie-container.scss";

export interface IPieContainer {
  end: number;
  value: number;
  start?: number;
  suffix?: string;
}

const _PieContainerSmall: React.FC<IPieContainer> = ({
  start = 0,
  end,
  value,
  suffix
}) => (
  <Center>
    <RowItem small>
      <GVProgramPeriod start={start} end={end} value={value} variant="pie" />
    </RowItem>
    <RowItem className="program-period-pie__text">
      {value} {suffix}
    </RowItem>
  </Center>
);

const PieContainerSmall = React.memo(_PieContainerSmall);
export default PieContainerSmall;
