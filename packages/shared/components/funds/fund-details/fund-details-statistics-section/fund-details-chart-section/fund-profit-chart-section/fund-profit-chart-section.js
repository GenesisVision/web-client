import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

import FundProfitChart from "./fund-profit-chart";

const FundProfitChartSection = ({
  profitChart,
  period,
  onPeriodChange,
  currency
}) => {
  if (!profitChart) return null;
  return (
    <Fragment>
      <div className="details-chart__value">
        <StatisticItem
          label={"Value"}
          equivalent={profitChart.totalProgramCurrencyProfit}
          equivalentCurrency={profitChart.programCurrency}
          big
          accent
        >
          <NumberFormat
            value={formatValue(profitChart.totalGvtProfit)}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
        {/* <StatisticItem
          heading={"Change"}
          value={changeValue}
          equivalent={"???"}
          currency={"???"}
          className="details-chart__stat-item"
        /> */}
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <div className="details-chart__profit">
        <FundProfitChart equityChart={profitChart.equityChart} />
      </div>
    </Fragment>
  );
};

export default FundProfitChartSection;
