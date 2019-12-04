import ProfitChart, { EquityChartType } from "components/chart/profit-chart";
import { ChartsDataType } from "components/details/details-statistic-section/details.chart.helpers";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector";
import * as React from "react";

import FundProfitTooltip from "./fund-profit-tooltip";

const _FundProfitChart: React.FC<Props> = ({
  profitChart,
  chartCurrencies
}) => {
  const equityCharts = profitChart.map(chart => chart.chart);
  const equities = equityCharts.map(equityChart =>
    (equityChart as EquityChartType).map((item: any) => ({
      ...item,
      assets:
        [
          ...[], //item.assetsState.assets,
          {
            icon: "",
            color: "grey",
            name: "Other",
            asset: "Other",
            percent: 10 // item.assetsState.otherPercent
          }
        ].filter(({ percent }) => !!percent) || []
    }))
  );
  return (
    <ProfitChart
      equityCharts={equityCharts}
      tooltip={FundProfitTooltip}
      equities={equities}
      colors={chartCurrencies}
    />
  );
};

interface Props {
  profitChart: ChartsDataType;
  chartCurrencies?: TChartCurrency[];
}

const FundProfitChart = React.memo(_FundProfitChart);
export default FundProfitChart;
