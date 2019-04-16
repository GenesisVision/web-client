import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";

import ProgramProfitChart from "./program-profit-chart";
import { ProgramDetailsProfitChart } from "../../../services/program-details.types";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { HandlePeriodChangeType } from "../../program-details-statistic-section";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";

const ProgramProfitChartSection: React.FC<Props> = ({
  profitChart,
  period,
  onPeriodChange
}) => (
  <>
    <div className="details-chart__value">
      <StatisticItem
        label={"Value"}
        equivalent={profitChart.timeFrameProgramCurrencyProfit}
        equivalentCurrency={profitChart.programCurrency}
        big
        accent
      >
        <NumberFormat
          value={formatCurrencyValue(profitChart.timeFrameGvtProfit, "GVT")}
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
        currency={profitChart.programCurrency as CURRENCIES}
      />
    </div>
  </>
);

interface Props {
  profitChart: ProgramDetailsProfitChart;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

export default ProgramProfitChartSection;
