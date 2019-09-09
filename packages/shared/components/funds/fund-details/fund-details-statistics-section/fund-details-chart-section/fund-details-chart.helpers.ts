import { PlatformCurrency } from "gv-api-web";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useChartPeriodCreator } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { ISelectChangeEvent } from "shared/components/select/select";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { CurrencyEnum } from "shared/utils/types";

import {
  statisticCurrencyAction,
  statisticPeriodAction
} from "../../actions/fund-details.actions";
import { fundIdSelector } from "../../reducers/description.reducer";
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

type TUseFundChartStateValues = () => {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: () => void;
  removeCurrency: (name: string) => void;
  changeCurrency: (i: number) => (event: ISelectChangeEvent) => void;
};
export const useFundChartStateValues: TUseFundChartStateValues = () => {
  const dispatch = useDispatch();
  const id = useSelector(fundIdSelector);
  const period = useSelector(statisticPeriodSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const platformCurrencies = useSelector(platformChartCurrenciesSelector);
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >([...platformCurrencies.filter(({ name }) => name === statisticCurrency)]);
  const [selectCurrencies, setSelectCurrencies] = useState<TChartCurrency[]>(
    []
  );
  useEffect(
    () => {
      setSelectCurrencies(
        platformCurrencies.filter(
          ({ name }) =>
            !!!selectedCurrencies.find(currency => currency.name === name)
        )
      );
    },
    [platformCurrencies, selectedCurrencies]
  );
  useEffect(
    () => {
      const currencies = selectedCurrencies.map(({ name }) => name);
      const opts = {
        id,
        period,
        currencies
      };
      dispatch(getBalanceChart(opts));
      dispatch(getProfitChart(opts));
    },
    [period, id, selectedCurrencies, dispatch]
  );
  const addCurrency = useCallback(
    () => {
      setSelectedCurrencies([...selectedCurrencies, selectCurrencies[0]]);
    },
    [selectedCurrencies, selectCurrencies]
  );
  const removeCurrency = useCallback(
    (name: string) => {
      setSelectedCurrencies([
        ...selectedCurrencies.filter(item => item.name !== name)
      ]);
    },
    [selectedCurrencies]
  );
  const changeCurrency = useCallback(
    (i: number) => (event: ISelectChangeEvent) => {
      const newSelectedCurrencies = selectedCurrencies.filter(
        ({ name }) => name !== event.target.value
      );
      newSelectedCurrencies[i] = platformCurrencies.find(
        ({ name }) => name === event.target.value
      )!;
      setSelectedCurrencies([...newSelectedCurrencies]);
      dispatch(statisticCurrencyAction(newSelectedCurrencies[0].name));
    },
    [selectedCurrencies, platformCurrencies, dispatch]
  );
  return {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  };
};

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
