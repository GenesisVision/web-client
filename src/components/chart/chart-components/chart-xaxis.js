import { GVColors } from "gv-react-components";
import React from "react";
import { XAxis } from "recharts";

import { composeTicks, dateTickFormatter } from "./chart-components.helpers";

const chartXAxis = (start, end) => {
  return (
    <XAxis
      dataKey="date"
      domain={["dataMin", "dataMax"]}
      type="number"
      tick={{
        fill: GVColors.$labelColor,
        fontSize: "12",
        transform: "translate(0, 8)"
      }}
      tickFormatter={dateTickFormatter(start, end)}
      allowDuplicatedCategory={false}
      axisLine={false}
      ticks={composeTicks(start, end)}
    />
  );
};

export default chartXAxis;
