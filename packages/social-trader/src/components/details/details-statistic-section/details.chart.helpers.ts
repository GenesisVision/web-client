import {
  TChartData,
  TUseChartPeriodCreator,
  TUseFundChartStateDataCreator,
  TUseFundChartStateValuesCreator
} from "components/details/details-statistic-section/details.chart.types";
import { ISelectChangeEvent } from "components/select/select";
import { PlatformCurrencyInfo } from "gv-api-web";
import { TChartCurrency } from "modules/chart-currency-selector/chart-currency-selector.types";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { platformCurrenciesSelector } from "reducers/platform-reducer";
import { RootState } from "reducers/root-reducer";
import { createSelector } from "reselect";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";

import { DETAILS_CHART_TABS } from "./details-chart-section/details-chart";

export const useChartPeriodCreator: TUseChartPeriodCreator = (
  selector,
  action
) => {
  const period = useSelector(selector);
  const dispatch = useDispatch();
  const setPeriod = useCallback(period => {
    dispatch(action(period));
  }, []);
  return {
    period,
    setPeriod
  };
};

export const useChartData = <T>(
  chart: T,
  selectedCurrencies: TChartCurrency[]
): TChartData<T> => {
  const [chartData, setChartData] = useState<TChartData<T>>({
    chart,
    selectedCurrencies
  });
  useEffect(() => {
    setChartData({
      chart,
      selectedCurrencies: [...selectedCurrencies]
    });
  }, [chart, selectedCurrencies]);
  return chartData;
};

export const convertToChartCurrency = ({
  name,
  color
}: PlatformCurrencyInfo): TChartCurrency => ({
  name: name as CurrencyEnum,
  color
});

export const platformChartCurrenciesSelector = createSelector<
  RootState,
  PlatformCurrencyInfo[],
  TChartCurrency[]
>(
  state => platformCurrenciesSelector(state),
  currencies => currencies.map(convertToChartCurrency)
);

export const useChartStateDataCreator: TUseFundChartStateDataCreator = ({
  view,
  statisticCurrencyAction,
  absoluteProfitChartSelector,
  profitChartSelector,
  balanceChartSelector,
  statisticCurrencySelector,
  idSelector,
  statisticPeriodSelector,
  getBalanceChart,
  getAbsoluteProfitChart,
  getProfitChart
}) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);
  const period = useSelector(statisticPeriodSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const platformCurrencies = useSelector(platformChartCurrenciesSelector);
  const absoluteProfitChart = useSelector(absoluteProfitChartSelector);
  const profitChart = useSelector(profitChartSelector);
  const balanceChart = useSelector(balanceChartSelector);
  const [selectedCurrencies, setSelectedCurrencies] = useState<
    TChartCurrency[]
  >(platformCurrencies.filter(({ name }) => name === statisticCurrency));
  useEffect(() => {
    setSelectedCurrencies([
      ...platformCurrencies.filter(({ name }) => name === statisticCurrency),
      ...selectedCurrencies.slice(1, selectedCurrencies.length)
    ]);
  }, [statisticCurrency]);
  useEffect(() => {
    if (!selectedCurrencies.length || !id || !period) return;
    const currencies = selectedCurrencies.map(({ name }) => name);
    const opts = {
      id,
      period,
      currencies
    };
    dispatch(getProfitChart(opts));
    switch (view) {
      case DETAILS_CHART_TABS.ABSOLUTE_PROFIT:
        dispatch(getAbsoluteProfitChart(opts));
        break;
      case DETAILS_CHART_TABS.BALANCE:
        dispatch(getBalanceChart(opts));
    }
  }, [period, id, selectedCurrencies]);
  return {
    absoluteProfitChart,
    statisticCurrencyAction,
    platformCurrencies,
    profitChart,
    balanceChart,
    selectedCurrencies,
    setSelectedCurrencies
  };
};

export const useChartStateValuesCreator: TUseFundChartStateValuesCreator = useFundChartStateData => {
  const dispatch = useDispatch();
  const {
    statisticCurrencyAction,
    platformCurrencies,
    selectedCurrencies,
    setSelectedCurrencies
  } = useFundChartStateData;
  const [selectCurrencies, setSelectCurrencies] = useState<TChartCurrency[]>(
    []
  );
  useEffect(() => {
    setSelectCurrencies(
      platformCurrencies.filter(
        ({ name }) =>
          !selectedCurrencies.find(currency => currency.name === name)
      )
    );
  }, [platformCurrencies, selectedCurrencies]);

  const addCurrency = useCallback(
    currency => {
      setSelectedCurrencies([
        ...selectedCurrencies,
        safeGetElemFromArray(selectCurrencies, ({ name }) => name === currency)
      ]);
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
      newSelectedCurrencies[i] = safeGetElemFromArray(
        platformCurrencies,
        ({ name }) => name === event.target.value
      );
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
