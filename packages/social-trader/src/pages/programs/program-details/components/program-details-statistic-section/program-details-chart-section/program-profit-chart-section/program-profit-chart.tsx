import * as React from "react";
import ProfitChart from "shared/components/chart/profit-chart";
import { ChartsDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";

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
