import ChartPeriod from "components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  BalanceChartElementType,
  BalanceChartType
} from "components/details/details-statistic-section/details.chart.types";
import { DetailsChartContainer } from "components/details/details-statistic-section/details-chart-section/details-chart-container";
import { LabeledValue } from "components/labeled-value/labeled-value";
import { Row } from "components/row/row";
import { Text } from "components/text/text";
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
        <LabeledValue label={t("asset-details:chart.value")}>
          <Text weight={"bold"} size={"xlarge"}>
            <NumberFormat
              value={formatCurrencyValue(balance, name)}
              thousandSeparator={" "}
              displayType="text"
              suffix={` ${name}`}
            />
          </Text>
        </LabeledValue>
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
      <DetailsChartContainer data-test-id={BALANCE_CHART_TEST_ID}>
        {!!chart.length &&
          renderBalanceChart({
            balanceChart: chart,
            currency: name,
            color
          })}
      </DetailsChartContainer>
    </>
  );
};

const BalanceChartElements = withLoader(React.memo(_BalanceChartElements));
export default BalanceChartElements;
