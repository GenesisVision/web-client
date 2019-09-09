import { ProgramProfitChart as ProgramProfitChartType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader from "shared/decorators/with-loader";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import ProgramProfitChart from "./program-profit-chart";

const PROGRAM_CHART_CURRENCY = "GVT";

const _ProgramProfitChartElements: React.FC<Props> = ({
  profitChart,
  period,
  setPeriod
}) => {
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem
          label={"Value"}
          equivalent={profitChart.timeframeProgramCurrencyProfit}
          equivalentCurrency={profitChart.programCurrency}
          big
          accent
        >
          <NumberFormat
            value={formatCurrencyValue(
              profitChart.timeframeGvtProfit,
              PROGRAM_CHART_CURRENCY
            )}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${PROGRAM_CHART_CURRENCY}`}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={setPeriod} period={period} />
      <div className="details-chart__profit">
        <ProgramProfitChart
          profitChart={[profitChart]}
          chartCurrencies={[
            { name: profitChart.programCurrency, color: "#fff" }
          ]}
        />
      </div>
    </>
  );
};

interface Props {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  profitChart: ProgramProfitChartType;
}

const ProgramProfitChartElements = withLoader(
  React.memo(_ProgramProfitChartElements)
);
export default ProgramProfitChartElements;
