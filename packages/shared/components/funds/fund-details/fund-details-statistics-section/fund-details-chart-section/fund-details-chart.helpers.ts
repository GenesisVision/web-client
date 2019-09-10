import { PlatformCurrency } from "gv-api-web";
import { useEffect, useState } from "react";
import { createSelector } from "reselect";
import {
  useChartPeriodCreator,
  useChartStateDataCreator,
  useFundChartStateValuesCreator
} from "shared/components/details/details-statistic-section/details.chart.helpers";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import { statisticPeriodAction } from "../../actions/fund-details.actions";
import {
  FundBalanceChartDataType,
  fundBalanceChartSelector
} from "../../reducers/balance-chart.reducer";
import { fundIdSelector } from "../../reducers/description.reducer";
import {
  FundProfitChartDataType,
  fundProfitChartSelector
} from "../../reducers/profit-chart.reducer";
import { statisticCurrencySelector } from "../../reducers/statistic-currency.reducer";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";
import {
  getBalanceChart,
  getProfitChart
} from "../../services/fund-details.service";

export const convertToChartCurrency = ({
  name,
  color
}: PlatformCurrency): TChartCurrency => ({
  name: name as CurrencyEnum,
  color
});

export const platformChartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrency[],
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  currencies => currencies.map(convertToChartCurrency)
);

export type TUseFundChartStateData = () => {
  platformCurrencies: TChartCurrency[];
  profitChart?: FundProfitChartDataType;
  balanceChart?: FundBalanceChartDataType;
  selectedCurrencies: TChartCurrency[];
  setSelectedCurrencies: (currencies: TChartCurrency[]) => void;
};

export const useFundChartStateData = () =>
  useChartStateDataCreator({
    idSelector: fundIdSelector,
    statisticPeriodSelector,
    statisticCurrencySelector,
    profitChartSelector: fundProfitChartSelector,
    balanceChartSelector: fundBalanceChartSelector,
    getBalanceChart,
    getProfitChart
  });

export const useFundChartStateValues = () =>
  useFundChartStateValuesCreator(useFundChartStateData);

export const useChartPeriod = () =>
  useChartPeriodCreator(statisticPeriodSelector, statisticPeriodAction);

type TChartData<T> = {
  chart: T;
  selectedCurrencies: TChartCurrency[];
};

export const useChartData = <T>(
  chart: T,
  selectedCurrencies: TChartCurrency[]
): TChartData<T> => {
  const [chartData, setChartData] = useState<TChartData<T>>({
    chart,
    selectedCurrencies
  });
  useEffect(
    () => {
      setChartData({
        chart,
        selectedCurrencies: [...selectedCurrencies]
      });
    },
    [chart, selectedCurrencies]
  );
  return chartData;
};
