import { DashboardAssetChart } from "gv-api-web";
import * as React from "react";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ProfitChart from "shared/components/chart/profit-chart";
import ProgramProfitTooltip from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-tooltip";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";

const _MultiProfitChart: React.FC<Props> = ({ charts }) => {
  const equityCharts = charts.map(({ chart }) => chart);
  const colors = charts.map(({ color }) => ({ color }));
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
  charts: DashboardAssetChart[];
  colors?: TChartCurrency[];
}

const MultiProfitChart = React.memo(_MultiProfitChart);
export default MultiProfitChart;
