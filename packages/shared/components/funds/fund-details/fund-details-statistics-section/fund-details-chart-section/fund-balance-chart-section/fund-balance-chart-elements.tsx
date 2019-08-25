import { FundBalanceChart as FundBalanceChartType } from "gv-api-web";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import ChartCurrencySelector, {
  TChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { formatCurrencyValue } from "shared/utils/formatter";

import { useChartData, useChartPeriod } from "../fund-details-chart.helpers";
import FundBalanceChart from "./fund-balance-chart";

const _FundBalanceChartElements: React.FC<Props> = ({
  selectedCurrencies,
  balanceChart,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const [t] = useTranslation();
  const { period, setPeriod } = useChartPeriod();
  const chartData = useChartData<FundBalanceChartType>(
    balanceChart,
    selectedCurrencies
  );
  const { name, color } = chartData.selectedCurrencies[0];
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem label={t("fund-details-page.chart.value")} big accent>
          <NumberFormat
            value={formatCurrencyValue(chartData.chart.balance, name)}
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
        <FundBalanceChart
          balanceChart={chartData.chart.balanceChart}
          currency={name}
          color={color}
        />
      </div>
    </>
  );
};

interface OwnProps {
  selectedCurrencies: TChartCurrency[];
  balanceChart: FundBalanceChartType;
  addCurrency: () => void;
  removeCurrency: (name: string) => void;
  changeCurrency: (i: number) => (event: ISelectChangeEvent) => void;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const FundBalanceChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_FundBalanceChartElements);
export default FundBalanceChartElements;
