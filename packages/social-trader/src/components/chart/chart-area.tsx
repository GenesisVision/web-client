import * as React from "react";
import { Area } from "recharts";

const ChartArea: React.FC<Props> = ({ data, stroke, fill }) => (
  <>
    {/*
        //@ts-ignore*/}
    <Area
      dataKey="value"
      type="monotone"
      // @ts-ignore
      data={data}
      connectNulls={true}
      stroke={stroke}
      fill={fill}
      strokeWidth={3}
      dot={false}
      unit=" %"
      isAnimationActive={false}
    />
  </>
);

interface Props {
  data: any;
  stroke: string;
  fill: string;
}

export default ChartArea;
