import "./pie-container.scss";

import * as React from "react";

import GVProgramPeriod from "../gv-program-period";

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
  <div className="program-period-pie">
    <GVProgramPeriod start={start} end={end} value={value} variant="pie" />
    <div className="program-period-pie__text">
      {value} {suffix}
    </div>
  </div>
);

const PieContainerSmall = React.memo(_PieContainerSmall);
export default PieContainerSmall;
