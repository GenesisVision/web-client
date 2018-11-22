import React, { Fragment } from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatValue } from "shared/utils/formatter";

import ProgramProfitChart from "./program-profit-chart";

const ProgramProfitChartSection = ({
  profitChartData,
  period,
  onPeriodChange,
  currency
}) => {
  const { data: profitChart } = profitChartData;
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
        <ProgramProfitChart
          equityChart={profitChart.equityChart}
          pnlChart={profitChart.pnLChart}
          currency={profitChart.programCurrency}
          period={period}
        />
      </div>
    </Fragment>
  );
};

export default ProgramProfitChartSection;
