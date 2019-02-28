import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import FundBalanceChart from "./fund-balance-chart";

const ProgramBalanceChartSection = ({
  balanceChart,
  period,
  onPeriodChange,
  currency
}) => {
  if (!balanceChart) return null;
  return (
    <Fragment>
      <div className="details-chart__value">
        <StatisticItem
          label={"Value"}
          equivalent={balanceChart.programCurrencyBalance}
          equivalentCurrency={balanceChart.programCurrency}
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(balanceChart.gvtBalance, "GVT")}
            thousandSeparator={" "}
            displayType="text"
            suffix={" GVT"}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <div className="details-chart__profit">
        <FundBalanceChart
          balanceChart={balanceChart.balanceChart}
          currency={"GVT"}
        />
      </div>
    </Fragment>
  );
};

export default ProgramBalanceChartSection;
