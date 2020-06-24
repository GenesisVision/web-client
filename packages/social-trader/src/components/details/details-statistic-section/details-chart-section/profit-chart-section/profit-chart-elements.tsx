import ChartPeriod from "components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import {
  ChartAssetsType,
  ChartsDataType,
  ProfitChartDataType,
  StatisticDataType
} from "components/details/details-statistic-section/details.chart.types";
import { Row } from "components/row/row";
import StatisticItem from "components/statistic-item/statistic-item";
import { withBlurLoader } from "decorators/with-blur-loader";
import ChartCurrencySelector from "modules/chart-currency-selector/chart-currency-selector";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "modules/chart-currency-selector/chart-currency-selector.types";
import * as React from "react";
import { useTranslation } from "react-i18next";
import NumberFormat from "react-number-format";
import { useSelector } from "react-redux";
import { platformCurrenciesSelector } from "reducers/platform-reducer";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum, HandlePeriodChangeType } from "utils/types";

import { useChartData } from "../../details.chart.helpers";
import styles from "../details-chart-section.module.scss";

export const PROFIT_CHART_TEST_ID = "PROFIT_CHART_TEST_ID";

const _ProfitChartElements: React.FC<Props> = ({
  renderProfitChart,
  period,
  setPeriod,
  data,
  selectedCurrencies,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const [t] = useTranslation();
  const chartData = useChartData<ProfitChartDataType>(data, selectedCurrencies);
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const { name } = chartData.selectedCurrencies[0];
  const { statistic, charts } = chartData.chart;
  return (
    <>
      <Row>
        <StatisticItem big accent label={t("details-page.chart.percent")}>
          <NumberFormat
            value={formatCurrencyValue(statistic.profitPercent, name)}
            thousandSeparator={" "}
            displayType="text"
            suffix={` %`}
          />
        </StatisticItem>
      </Row>
      <ChartPeriod onChange={setPeriod} period={period} />
      <ChartCurrencySelector
        fullSelectCurrencies={platformCurrencies.map(
          ({ name }) => name as CurrencyEnum
        )}
        maxCharts={
          selectCurrencies.length + chartData.selectedCurrencies.length
        }
        selectCurrencies={selectCurrencies.map(({ name }) => name)}
        chartCurrencies={chartData.selectedCurrencies}
        onAdd={addCurrency}
        onRemove={removeCurrency}
        onChange={changeCurrency}
      />
      <div
        data-test-id={PROFIT_CHART_TEST_ID}
        className={styles["details-chart__profit"]}
      >
        {charts.length &&
          renderProfitChart({
            assets:
              "assets" in chartData.chart ? chartData.chart.assets : undefined,
            profitChart: charts,
            chartCurrencies: chartData.selectedCurrencies
          })}
      </div>
    </>
  );
};

export type TRenderProfitValue = (props: {
  statistic: StatisticDataType;
}) => JSX.Element;

export type TRenderProfitChart = (props: {
  profitChart: ChartsDataType;
  assets?: ChartAssetsType;
  chartCurrencies?: TChartCurrency[];
}) => JSX.Element;

interface OwnProps {
  renderProfitChart: TRenderProfitChart;
  renderProfitValue: TRenderProfitValue;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  data: ProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const ProfitChartElements = withBlurLoader(React.memo(_ProfitChartElements));
export default ProfitChartElements;
