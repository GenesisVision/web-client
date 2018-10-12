import ChartPeriod from "components/chart/chart-period/chart-period";
import StatisticItem from "components/statistic-item/statistic-item";
import React, { Fragment } from "react";

import FundProfitChart from "./fund-profit-chart";

const FundProfitChartSection = ({
  profitChartData,
  period,
  onPeriodChange,
  currency
}) => {
  const { data: profitChart } = profitChartData;
  if (!profitChart) return null;
  return (
    <Fragment>
      <div>
        <StatisticItem
          heading={"Value"}
          value={profitChart.totalGvtProfit}
          equivalent={profitChart.totalProgramCurrencyProfit}
          currency={profitChart.programCurrency}
          className="fund-details-chart__stat-item"
        />
        {/* <StatisticItem
          heading={"Change"}
          value={changeValue}
          equivalent={"???"}
          currency={"???"}
          className="fund-details-chart__stat-item"
        /> */}
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <div className="fund-details-chart__profit">
        <FundProfitChart
          equityChart={profitChart.equityChart}
          pnlChart={profitChart.pnLChart}
          currency={profitChart.programCurrency}
        />
      </div>
    </Fragment>
  );
};

export default FundProfitChartSection;
