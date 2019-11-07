import { DashboardAssetChart } from "gv-api-web";
import * as React from "react";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ProfitChart from "shared/components/chart/profit-chart";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import ProgramProfitTooltip from "shared/components/programs/program-details/program-details-statistic-section/program-details-chart-section/program-profit-chart-section/program-profit-tooltip";

const _MultiProfitChart: React.FC<Props> = ({ charts }) => {
  const equityCharts = charts.map(({ chart }) => chart);
  const colors = charts.map(({ color }) => ({ color }));
  const equities = equityCharts.map(equityChart =>
    equityChart.map(x => ({
      date: (x.date.getTime() as unknown) as Date,
      value: formartChartMinValue(x.value)
    }))
  );
  return (
    <ProfitChart
      tooltip={ProgramProfitTooltip}
      equityCharts={equityCharts}
      equities={equities}
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
