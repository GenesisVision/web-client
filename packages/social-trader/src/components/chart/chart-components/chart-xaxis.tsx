import * as React from "react";
import { XAxis } from "recharts";
import { $labelColor } from "utils/style/colors";

import { composeTicks, dateTickFormatter } from "./chart-components.helpers";

const chartXAxis = (start: Date | number, end: Date | number): JSX.Element => (
  <XAxis
    dataKey="date"
    domain={["dataMin", "dataMax"]}
    type="number"
    tick={{
      fill: $labelColor,
      fontSize: "12",
      transform: "translate(0, 8)"
    }}
    tickFormatter={dateTickFormatter(start, end)}
    allowDuplicatedCategory={false}
    axisLine={false}
    ticks={composeTicks(start, end)}
  />
);

export default chartXAxis;
