import { FundProfitChart as FundProfitChartType } from "gv-api-web";
import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import ChartCurrencySelector from "shared/modules/chart-currency-selector/chart-currency-selector";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import FundProfitChart from "./fund-profit-chart";

const _FundProfitChartSection: React.FC<Props> = ({
  profitChart,
  period,
  onPeriodChange
}) => (
  <>
    <div className="details-chart__value">
      <StatisticItem
        label={"Value"}
        equivalent={+formatCurrencyValue(profitChart.timeframeUsdProfit, "USD")}
        equivalentCurrency="USD"
        big
        accent
      >
        <NumberFormat
          value={profitChart.profitPercent}
          thousandSeparator={" "}
          displayType="text"
          suffix={" %"}
        />
      </StatisticItem>
    </div>
    <ChartPeriod onChange={onPeriodChange} period={period} />
    <ChartCurrencySelector />
    <div className="details-chart__profit">
      <FundProfitChart equityChart={profitChart.equityChart} />
    </div>
  </>
);

interface Props {
  profitChart: FundProfitChartType;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

const FundProfitChartSection = React.memo(_FundProfitChartSection);
export default FundProfitChartSection;
