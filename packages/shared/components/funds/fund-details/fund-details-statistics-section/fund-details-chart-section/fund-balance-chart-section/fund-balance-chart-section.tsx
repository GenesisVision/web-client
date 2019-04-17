import { FundBalanceChart as FundBalanceChartType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import FundBalanceChart from "./fund-balance-chart";

const FundBalanceChartSection: React.FC<Props> = ({
  balanceChart,
  period,
  onPeriodChange
}) => (
  <>
    <div className="details-chart__value">
      <StatisticItem
        label={"Value"}
        equivalent={balanceChart.usdBalance}
        equivalentCurrency={"USD"}
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
  </>
);

interface Props {
  balanceChart: FundBalanceChartType;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

export default React.memo(FundBalanceChartSection);
