import * as React from "react";
import { formartChartMinValue } from "shared/components/chart/chart-components/chart-components.helpers";
import ProfitChart, {
  EquityChartType
} from "shared/components/chart/profit-chart";
import { ProfitChartDataType } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";

import FundProfitTooltip from "./fund-profit-tooltip";

const _FundProfitChart: React.FC<Props> = ({
  profitChart,
  chartCurrencies
}) => {
  const equityCharts = profitChart.map(({ equityChart }) => equityChart);
  const equities = equityCharts.map(equityChart =>
    (equityChart as EquityChartType).map((item: any) => ({
      date: item.date.getTime(),
      value: formartChartMinValue(item.value),
      assets:
        [
          ...item.assetsState.assets,
          {
            icon: "",
            color: "grey",
            name: "Other",
            asset: "Other",
            percent: item.assetsState.otherPercent
          }
        ].filter(({ percent }) => !!percent) || []
    }))
  );
  return (
    <ProfitChart
      equityCharts={equityCharts}
      tooltip={FundProfitTooltip}
      equities={equities}
      chartCurrencies={chartCurrencies}
    />
  );
};

interface Props {
  profitChart: ProfitChartDataType;
  chartCurrencies?: TChartCurrency[];
}

const FundProfitChart = React.memo(_FundProfitChart);
export default FundProfitChart;
