import ChartPeriod from "components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  BalanceChartElementType,
  BalanceChartType
} from "components/details/details-statistic-section/details.chart.types";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import withLoader from "decorators/with-loader";
import {
  FundBalanceChart as FundBalanceChartType,
  ProgramBalanceChart as ProgramBalanceChartType
} from "gv-api-web";
import ChartCurrencySelector from "modules/chart-currency-selector/chart-currency-selector";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector.types";
import React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

import { useChartData } from "../../details.chart.helpers";
import styles from "../details-chart-section.module.scss";

export const BALANCE_CHART_TEST_ID = "BALANCE_CHART_TEST_ID";

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
  const { chart, balance } = chartData.chart;
  return (
    <>
      <Row>
        <StatisticItem label={t("asset-details:chart.value")} big accent>
          <NumberFormat
            value={formatCurrencyValue(balance, name)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` ${name}`}
          />
        </StatisticItem>
      </Row>
      <ChartPeriod onChange={setPeriod} period={period} />
      <ChartCurrencySelector
        maxCharts={1}
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div
        data-test-id={BALANCE_CHART_TEST_ID}
        className={styles["details-chart__profit"]}
      >
        {chart.length &&
          renderBalanceChart({
            balanceChart: chart,
            currency: name,
            color
          })}
      </div>
    </>
  );
};

export type TRenderBalanceChart = (props: {
  color: string;
  balanceChart: BalanceChartElementType;
  currency: CurrencyEnum;
}) => JSX.Element;

interface Props {
  renderBalanceChart: TRenderBalanceChart;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  selectedCurrencies: TChartCurrency[];
  balanceChart: BalanceChartType;
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
  selectCurrencies: TChartCurrency[];
}

const BalanceChartElements = withLoader(React.memo(_BalanceChartElements));
export default BalanceChartElements;
