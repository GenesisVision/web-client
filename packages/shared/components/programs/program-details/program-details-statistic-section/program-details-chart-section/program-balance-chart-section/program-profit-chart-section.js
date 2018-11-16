import React, { Fragment } from "react";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import StatisticItem from "shared/components/statistic-item/statistic-item";

import ProgramBalanceChart from "./program-balance-chart";

const ProgramBalanceChartSection = ({
  balanceChart,
  period,
  onPeriodChange,
  currency
}) => {
  if (!balanceChart) return null;
  return (
    <Fragment>
      <div>
        <StatisticItem
          heading={"Value"}
          value={balanceChart.gvtBalance}
          equivalent={balanceChart.programCurrencyBalance}
          currency={balanceChart.programCurrency}
          className="program-details-chart__stat-item"
        />
        {/* <StatisticItem
          heading={"Change"}
          value={changeValue}
          equivalent={"???"}
          currency={"???"}
          className="program-details-chart__stat-item"
        /> */}
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <div className="program-details-chart__profit">
        <ProgramBalanceChart
          balanceChart={balanceChart.balanceChart}
          currency={balanceChart.programCurrency}
        />
      </div>
    </Fragment>
  );
};

export default ProgramBalanceChartSection;
