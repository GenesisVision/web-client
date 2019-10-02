import * as React from "react";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import ProfitChart, {
  EquityChartType
} from "shared/components/chart/profit-chart";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import ProgramProfitTooltip from "./program-profit-tooltip";

const _ProgramProfitChart: React.FC<Props> = ({
  profitChart,
  chartCurrencies
}) => {
  const equityCharts = profitChart.map(({ equityChart }) => equityChart);
  const equities = equityCharts.map(equityChart =>
    (equityChart as EquityChartType).map(x => ({
      date: (x.date.getTime() as unknown) as Date,
      value: formartChartMinValue(x.value)
    }))
  );
  return (
    <ProfitChart
      tooltip={ProgramProfitTooltip}
      equityCharts={equityCharts}
      equities={equities}
      chartCurrencies={chartCurrencies}
    />
  );
};

interface Props {
  profitChart: ProfitChartDataType;
  chartCurrencies?: TChartCurrency[];
}

const ProgramProfitChart = React.memo(_ProgramProfitChart);
export default ProgramProfitChart;
