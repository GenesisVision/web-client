import * as React from "react";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ProfitChart, {
  EquityChartType
} from "shared/components/chart/profit-chart";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";

import ProgramProfitTooltip from "./program-profit-tooltip";

const _ProgramProfitChart: React.FC<Props> = ({ charts, colors }) => {
  const equityCharts = charts.map(({ equityChart }) => equityChart);
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
      colors={colors}
    />
  );
};

interface Props {
  charts: ProfitChartDataType;
  colors?: TChartCurrency[];
}

const ProgramProfitChart = React.memo(_ProgramProfitChart);
export default ProgramProfitChart;
