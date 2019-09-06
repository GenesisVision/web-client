import { ProgramProfitChart as ProgramProfitChartType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import ProgramProfitChart from "./program-profit-chart";

const _ProgramProfitChartSection: React.FC<Props> = ({
  profitChart,
  period,
  onPeriodChange
}) => (
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
          value={formatCurrencyValue(profitChart.timeframeGvtProfit, "GVT")}
          thousandSeparator={" "}
          displayType="text"
          suffix={" GVT"}
        />
      </StatisticItem>
    </div>
    <ChartPeriod onChange={onPeriodChange} period={period} />
    <div className="details-chart__profit">
      <ProgramProfitChart
        equityChart={profitChart.equityChart}
        //@ts-ignore
        pnlChart={profitChart.pnLChart}
        currency={profitChart.programCurrency}
      />
    </div>
  </>
);

interface Props {
  profitChart: ProgramProfitChartType;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

const ProgramProfitChartSection = React.memo(_ProgramProfitChartSection);
export default ProgramProfitChartSection;
