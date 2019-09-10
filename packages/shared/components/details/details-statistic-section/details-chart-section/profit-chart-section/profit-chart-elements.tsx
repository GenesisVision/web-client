import * as React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { compose } from "redux";
import ChartPeriod from "shared/components/chart/chart-period/chart-period";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { ISelectChangeEvent } from "shared/components/select/select";
import StatisticItem from "shared/components/statistic-item/statistic-item";
import withLoader, { WithLoaderProps } from "shared/decorators/with-loader";
import ChartCurrencySelector, {
  TChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import {
  ProfitChartDataType,
  ProfitChartType,
  useChartData
} from "../../details.chart.helpers";

const _ProfitChartElements: React.FC<Props> = ({
  renderProfitChart,
  renderProfitValue,
  period,
  setPeriod,
  profitChart,
  selectedCurrencies,
  addCurrency,
  removeCurrency,
  changeCurrency,
  selectCurrencies
}) => {
  const [t] = useTranslation();
  const chartData = useChartData<ProfitChartDataType>(
    profitChart,
    selectedCurrencies
  );
  const platformCurrencies = useSelector(platformCurrenciesSelector);
  const chart = chartData.chart[0];
  return (
    <>
      <div className="details-chart__value">
        <StatisticItem label={t("details-page.chart.value")} big accent>
          {renderProfitValue({ chart })}
        </StatisticItem>
      </div>
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
      <div className="details-chart__profit">
        {chartData.chart.length &&
          renderProfitChart({
            profitChart: chartData.chart,
            chartCurrencies: chartData.selectedCurrencies
          })}
      </div>
    </>
  );
};

export type TRenderProfitValue = (
  props: {
    chart: ProfitChartType;
  }
) => JSX.Element;

export type TRenderProfitChart = (
  props: {
    profitChart: ProfitChartDataType;
    chartCurrencies?: TChartCurrency[];
  }
) => JSX.Element;

interface OwnProps {
  renderProfitChart: TRenderProfitChart;
  renderProfitValue: TRenderProfitValue;
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
  profitChart: ProfitChartDataType;
  selectedCurrencies: TChartCurrency[];
  addCurrency: () => void;
  removeCurrency: (name: string) => void;
  changeCurrency: (i: number) => (event: ISelectChangeEvent) => void;
  selectCurrencies: TChartCurrency[];
}

interface Props extends OwnProps {}

const ProfitChartElements = compose<
  React.ComponentType<OwnProps & WithLoaderProps>
>(
  withLoader,
  React.memo
)(_ProfitChartElements);
export default ProfitChartElements;
