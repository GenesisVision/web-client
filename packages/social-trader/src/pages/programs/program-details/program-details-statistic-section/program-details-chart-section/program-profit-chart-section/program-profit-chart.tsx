import ProfitChart from "components/chart/profit-chart";
import { ChartsDataType } from "components/details/details-statistic-section/details.chart.types";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector";
import * as React from "react";

import ProgramProfitTooltip from "./program-profit-tooltip";

const _ProgramProfitChart: React.FC<Props> = ({ charts, colors }) => {
  const equityCharts = charts.map(chart => chart.chart);
  return (
    <ProfitChart
      tooltip={ProgramProfitTooltip}
      equityCharts={equityCharts}
      equities={equityCharts}
      colors={colors}
    />
  );
};

interface Props {
  charts: ChartsDataType;
  colors?: TChartCurrency[];
}

const ProgramProfitChart = React.memo(_ProgramProfitChart);
export default ProgramProfitChart;
