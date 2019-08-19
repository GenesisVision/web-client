import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import ChartCurrencySelector, {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { formatCurrencyValue } from "shared/utils/formatter";
import { HandlePeriodChangeType } from "shared/utils/types";

import { FundProfitChartDataType } from "../../../reducers/profit-chart.reducer";
import FundProfitChart from "./fund-profit-chart";

const _FundProfitChartSection: React.FC<Props> = ({
  chartCurrencies,
  addChartCurrency,
  removeChartCurrency,
  changeChartCurrency,
  profitChart,
  period,
  onPeriodChange
}) => {
  const [t] = useTranslation();
  const equivalentCurrency = "USD";
  const chart = profitChart[0];
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem
          label={t("fund-details-page.chart.value")}
          equivalent={
            +formatCurrencyValue(chart.timeframeUsdProfit, equivalentCurrency)
          }
          equivalentCurrency={equivalentCurrency}
          big
          accent
        >
          <NumberFormat
            value={chart.profitPercent}
            thousandSeparator={" "}
            displayType="text"
            suffix={" %"}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={onPeriodChange} period={period} />
      <ChartCurrencySelector
        chartCurrencies={chartCurrencies}
        onAdd={addChartCurrency}
        onRemove={removeChartCurrency}
        onChange={changeChartCurrency}
      />
      <div className="details-chart__profit">
        <FundProfitChart
          profitChart={profitChart}
          chartCurrencies={chartCurrencies}
        />
      </div>
    </>
  );
};

interface OwnProps {
  chartCurrencies: TChartCurrency[];
  addChartCurrency: TAddChartCurrency;
  removeChartCurrency: TRemoveChartCurrency;
  changeChartCurrency: TChangeChartCurrency;
  profitChart: FundProfitChartDataType;
  period: ChartDefaultPeriod;
  onPeriodChange: HandlePeriodChangeType;
}

interface Props extends OwnProps {}

const FundProfitChartSection = compose<React.ComponentType<OwnProps>>(
  React.memo
)(_FundProfitChartSection);
export default FundProfitChartSection;
