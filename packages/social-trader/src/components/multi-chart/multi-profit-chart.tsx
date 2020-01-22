import { formartChartMinValue } from "components/chart/chart-components/chart-components.helpers";
import ProfitChart from "components/chart/profit-chart";
import { DashboardAssetChart } from "gv-api-web";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector";
import ProgramProfitTooltip from "pages/invest/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-tooltip";
import * as React from "react";

const _MultiProfitChart: React.FC<Props> = ({ charts }) => {
  if (!charts || !charts.length) return null;
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
