import {
  BalanceChartPoint,
  FundBalanceChart,
  FundChartStatistic,
  FundProfitCharts,
  PlatformCurrencyInfo,
  ProgramBalanceChart,
  ProgramChartStatistic,
  ProgramProfitCharts,
  SimpleChart
} from "gv-api-web";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { FundBalanceChartDataType } from "shared/components/funds/fund-details/reducers/balance-chart.reducer";
import { ProgramBalanceChartDataType } from "shared/components/programs/program-details/reducers/balance-chart.reducer";
import { ISelectChangeEvent } from "shared/components/select/select";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { platformCurrenciesSelector } from "shared/reducers/platform-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { TSelectorData } from "shared/utils/selectors";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import { TStatisticCurrencyAction } from "../reducers/statistic-currency.reducer";
import {
  StatisticPeriodState,
  TStatisticPeriodAction
} from "../reducers/statistic-period.reducer";
import { DETAILS_CHART_TABS } from "./details-chart-section/details-chart";

export type TStatisticCurrencySelector = (state: RootState) => CurrencyEnum;

export type TBalanceChartSelector = (
  state: RootState
) => TSelectorData<BalanceChartDataType>;

export type TProfitChartSelector = (
  state: RootState
) => TSelectorData<ProfitChartDataType>;

export type TUseChartStateValuesOutput = {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
};
export type TUseChartStateValues = (
  view: DETAILS_CHART_TABS
) => TUseChartStateValuesOutput;

export type TUseChartPeriod = () => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};

type TUseChartPeriodCreator = (
  selector: (state: RootState) => StatisticPeriodState,
  action: (period: ChartDefaultPeriod) => TStatisticPeriodAction
) => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};
export const useChartPeriodCreator: TUseChartPeriodCreator = (
  selector,
  action
) => {
  const period = useSelector(selector);
  const dispatch = useDispatch();
  const setPeriod = useCallback(
    period => {
      dispatch(action(period));
    },
    [dispatch]
  );
  return {
    period,
    setPeriod
  };
};

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
  useEffect(() => {
    setChartData({
      chart,
      selectedCurrencies: [...selectedCurrencies]
    });
  }, [chart, selectedCurrencies]);
  return chartData;
};

export interface TGetChartArgs {
  currencies: CurrencyEnum[];
  id: string;
  period?: ChartDefaultPeriod;
}

export type ProfitChartType = FundProfitCharts | ProgramProfitCharts;
export type ProfitChartDataType = ProfitChartType;
export type StatisticDataType = ProgramChartStatistic | FundChartStatistic;
export type ChartsDataType = Array<SimpleChart>;

export type BalanceChartElementType = Array<BalanceChartPoint>;
export type BalanceChartType = FundBalanceChart | ProgramBalanceChart;
export type BalanceChartDataType =
  | FundBalanceChartDataType
  | ProgramBalanceChartDataType;

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

export type TGetChartFunc = (
  props: TGetChartArgs
) => (dispatch: Dispatch) => void;

type TUseFundChartStateDataMethods = {
  statisticCurrencyAction: (currency: CurrencyEnum) => TStatisticCurrencyAction;
  platformCurrencies: TChartCurrency[];
  profitChart?: ProfitChartDataType;
  balanceChart?: BalanceChartType;
  selectedCurrencies: TChartCurrency[];
  setSelectedCurrencies: (currencies: TChartCurrency[]) => void;
};
type TUseFundChartStateData = () => TUseFundChartStateDataMethods;
export type TUseFundChartStateDataCreator = (props: {
  view: DETAILS_CHART_TABS;
  statisticCurrencyAction: (currency: CurrencyEnum) => TStatisticCurrencyAction;
  profitChartSelector: (state: RootState) => TSelectorData<ProfitChartDataType>;
  balanceChartSelector: (state: RootState) => TSelectorData<BalanceChartType>;
  statisticCurrencySelector: (state: RootState) => CurrencyEnum;
  idSelector: (state: RootState) => string;
  statisticPeriodSelector: (state: RootState) => ChartDefaultPeriod;
  getBalanceChart: TGetChartFunc;
  getProfitChart: TGetChartFunc;
}) => TUseFundChartStateDataMethods;
export const useChartStateDataCreator: TUseFundChartStateDataCreator = ({
  view,
  statisticCurrencyAction,
  profitChartSelector,
  balanceChartSelector,
  statisticCurrencySelector,
  idSelector,
  statisticPeriodSelector,
  getBalanceChart,
  getProfitChart
}) => {
  const dispatch = useDispatch();
  const id = useSelector(idSelector);
  const period = useSelector(statisticPeriodSelector);
  const statisticCurrency = useSelector(statisticCurrencySelector);
  const platformCurrencies = useSelector(platformChartCurrenciesSelector);
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
    switch (view) {
      case DETAILS_CHART_TABS.PROFIT:
        dispatch(getProfitChart(opts));
        break;
      case DETAILS_CHART_TABS.BALANCE:
        dispatch(getProfitChart(opts));
        dispatch(getBalanceChart(opts));
    }
  }, [period, id, selectedCurrencies]);
  return {
    statisticCurrencyAction,
    platformCurrencies,
    profitChart,
    balanceChart,
    selectedCurrencies,
    setSelectedCurrencies
  };
};

type TUseFundChartStateValuesCreator = (
  useFundChartStateData: TUseFundChartStateDataMethods
) => TUseChartStateValuesOutput;
export const useFundChartStateValuesCreator: TUseFundChartStateValuesCreator = useFundChartStateData => {
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
          !!!selectedCurrencies.find(currency => currency.name === name)
      )
    );
  }, [platformCurrencies, selectedCurrencies]);

  const addCurrency = useCallback(
    currency => {
      setSelectedCurrencies([
        ...selectedCurrencies,
        selectCurrencies.find(({ name }) => name === currency)!
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
