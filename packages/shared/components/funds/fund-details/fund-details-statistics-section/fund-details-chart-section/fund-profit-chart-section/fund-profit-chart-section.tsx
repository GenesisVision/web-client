import * as React from "react";
import NumberFormat from "react-number-format";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundDetailsProfitChart } from "../../../services/fund-details.types";
import FundProfitChart from "./fund-profit-chart";

const FundProfitChartSection: React.FC<Props> = ({
  profitChart,
  period,
  onPeriodChange
}) => (
  <>
    <div className="details-chart__value">
      <StatisticItem
        label={"Value"}
        equivalent={+formatCurrencyValue(profitChart.timeFrameUsdProfit, "USD")}
        equivalentCurrency="USD"
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
      <FundProfitChart equityChart={profitChart.equityChart} />
    </div>
  </>
);

interface Props {
  profitChart: FundDetailsProfitChart;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

export default React.memo(FundProfitChartSection);
