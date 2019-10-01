import {
  FundBalanceChart as FundBalanceChartType,
  ProgramBalanceChart as ProgramBalanceChartType
} from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import ChartCurrencySelector, {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { formatCurrencyValue } from "shared/utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import {
  BalanceChartElementType,
  useChartData
} from "../../details.chart.helpers";

const _BalanceChartElements: React.FC<Props> = ({
  renderBalanceChart,
  period,
  setPeriod,
  selectedCurrencies,
  balanceChart,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const [t] = useTranslation();
  const chartData = useChartData<
    FundBalanceChartType | ProgramBalanceChartType
  >(balanceChart, selectedCurrencies);
  const { name, color } = chartData.selectedCurrencies[0];
  const balance = chartData.chart.balance;
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem label={t("details-page.chart.value")} big accent>
          <NumberFormat
            value={formatCurrencyValue(balance, name)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${name}`}
          />
        </StatisticItem>
      </div>
      <ChartPeriod onChange={setPeriod} period={period} />
      <ChartCurrencySelector
        maxCharts={1}
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div className="details-chart__profit">
        {chartData.chart.balanceChart.length &&
          renderBalanceChart({
            balanceChart: chartData.chart.balanceChart,
            currency: name,
            color
          })}
      </div>
    </>
  );
};

export type TRenderBalanceChart = (
  props: {
    color: string;
    balanceChart: BalanceChartElementType;
    currency: CurrencyEnum;
  }
) => JSX.Element;

interface OwnProps {
  renderBalanceChart: TRenderBalanceChart;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  selectedCurrencies: TChartCurrency[];
  balanceChart: FundBalanceChartType | ProgramBalanceChartType;
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const BalanceChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_BalanceChartElements);
export default BalanceChartElements;
