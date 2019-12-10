import ProfitChart, {
  EquityChartElementType,
  EquityChartType
} from "components/chart/profit-chart";
import {
  ChartAssetsType,
  ChartsDataType
} from "components/details/details-statistic-section/details.chart.types";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector";
import * as React from "react";

import FundProfitTooltip from "./fund-profit-tooltip";

const _FundProfitChart: React.FC<Props> = ({
  assets,
  profitChart,
  chartCurrencies
}) => {
  const equityCharts = profitChart.map(chart => chart.chart);
  const assetsChart = assets.map(
    assets =>
      (({
        ...assets,
        value: undefined
      } as unknown) as EquityChartElementType)
  );
  /*const equities = equityCharts.map(equityChart =>
    (equityChart as EquityChartType).map((item: any) => ({
      ...item,
      assets:
        [
          ...assets,
          {
            icon: "",
            color: "grey",
            name: "Other",
            asset: "Other",
            percent: 10 // item.assetsState.otherPercent
          }
        ].filter(({ percent }) => !!percent) || []
    }))
  );*/
  return (
    <ProfitChart
      equityCharts={equityCharts}
      tooltip={FundProfitTooltip}
      equities={[assetsChart, ...equityCharts]}
      colors={chartCurrencies}
    />
  );
};

interface Props {
  assets: ChartAssetsType;
  profitChart: ChartsDataType;
  chartCurrencies?: TChartCurrency[];
}

const FundProfitChart = React.memo(_FundProfitChart);
export default FundProfitChart;
