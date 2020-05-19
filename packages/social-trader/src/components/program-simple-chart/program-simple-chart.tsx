import ResponsiveContainer from "components/chart/responsive-container";
import SimpleChart from "components/chart/simple-chart";
import { SimpleChartPoint } from "gv-api-web";
import * as React from "react";

const _ProgramSimpleChart: React.FC<Props> = ({ data }) => {
  if (!data) return null;
  return (
    <ResponsiveContainer>
      {({ width }) => <SimpleChart width={width} data={data} />}
    </ResponsiveContainer>
  );
};

interface Props {
  data?: SimpleChartPoint[];
}

const ProgramSimpleChart = React.memo(_ProgramSimpleChart);
export default ProgramSimpleChart;
