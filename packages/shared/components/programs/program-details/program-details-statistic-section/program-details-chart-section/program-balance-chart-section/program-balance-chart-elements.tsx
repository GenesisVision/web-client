import { ProgramBalanceChart as ProgramBalanceChartType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader from "shared/decorators/with-loader";
import { formatValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import ProgramBalanceChart from "./program-balance-chart";

const PROGRAM_CHART_CURRENCY = "GVT";

const _ProgramBalanceChartElements: React.FC<Props> = ({
  setPeriod,
  period,
  balanceChart
}) => {
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem
          label={"Value"}
          equivalent={balanceChart.programCurrencyBalance}
          equivalentCurrency={balanceChart.programCurrency}
          big
          accent
        >
          <NumberFormat
            value={formatValue(balanceChart.gvtBalance)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${PROGRAM_CHART_CURRENCY}`}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={setPeriod} period={period} />
      <div className="details-chart__profit">
        <ProgramBalanceChart
          balanceChart={balanceChart.balanceChart}
          currency={balanceChart.programCurrency}
        />
      </div>
    </>
  );
};

interface Props {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  balanceChart: ProgramBalanceChartType;
}

const ProgramBalanceChartElements = withLoader(
  React.memo(_ProgramBalanceChartElements)
);
export default ProgramBalanceChartElements;
