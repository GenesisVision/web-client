import { ProgramBalanceChart as ProgramBalanceChartType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { CURRENCIES } from "shared/modules/currency-select/currency-select.constants";
import { formatValue } from "shared/utils/formatter";

import { HandlePeriodChangeType } from "../../program-details-statistic-section";
import ProgramBalanceChart from "./program-balance-chart";

const ProgramBalanceChartSection: React.FC<Props> = ({
  balanceChart,
  period,
  onPeriodChange
}) => (
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
          suffix={" GVT"}
        />
      </StatisticItem>
    </div>
    <ChartPeriod onChange={onPeriodChange} period={period} />
    <div className="details-chart__profit">
      <ProgramBalanceChart
        balanceChart={balanceChart.balanceChart}
        currency={balanceChart.programCurrency}
      />
    </div>
  </>
);

interface Props {
  balanceChart: ProgramBalanceChartType;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

export default React.memo(ProgramBalanceChartSection);
