import {
  BalanceChartElement,
  FundBalanceChart,
  FundProfitChart,
  PlatformCurrency,
  ProgramBalanceChart,
  ProgramBalanceChartElement,
  ProgramProfitChart
} from "gv-api-web";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { FundBalanceChartDataType } from "shared/components/funds/fund-details/reducers/balance-chart.reducer";
import { ProgramBalanceChartDataType } from "shared/components/programs/program-details/reducers/balance-chart.reducer";
import { ISelectChangeEvent } from "shared/components/select/select";
import { IDashboardAssetChart } from "shared/constants/constants";
import {
  TAddChartCurrency,
  TChangeChartCurrency,
  TChartCurrency,
  TRemoveChartCurrency
} from "shared/modules/chart-currency-selector/chart-currency-selector";
import { RootState } from "shared/reducers/root-reducer";
import { TSelectorData } from "shared/utils/selectors";
import { CurrencyEnum, HandlePeriodChangeType } from "shared/utils/types";

import { platformCurrenciesSelector } from "../../../reducers/platform-reducer";
import { TStatisticCurrencyAction } from "../reducers/statistic-currency.reducer";
import {
  StatisticPeriodState,
  TStatisticPeriodAction
} from "../reducers/statistic-period.reducer";

export type TStatisticCurrencySelector = (state: RootState) => CurrencyEnum;

export type TBalanceChartSelector = (
  state: RootState
) => TSelectorData<BalanceChartDataType>;

export type TProfitChartSelector = (
  state: RootState
) => TSelectorData<ProfitChartDataType>;

export type TUseChartStateValues = () => {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
};

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
    [action, dispatch]
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

export interface TGetChartArgs {
  currencies: CurrencyEnum[];
  id: string;
  period?: ChartDefaultPeriod;
}

export type ProfitChartType =
  | FundProfitChart
  | ProgramProfitChart
  | IDashboardAssetChart;
export type ProfitChartDataType = Array<ProfitChartType>;

export type BalanceChartElementType = Array<
  BalanceChartElement | ProgramBalanceChartElement
>;
export type BalanceChartType = FundBalanceChart | ProgramBalanceChart;
export type BalanceChartDataType =
  | FundBalanceChartDataType
  | ProgramBalanceChartDataType;

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
export type TUseFundChartStateDataCreator = (
  props: {
    statisticCurrencyAction: (
      currency: CurrencyEnum
    ) => TStatisticCurrencyAction;
    profitChartSelector: (
      state: RootState
    ) => TSelectorData<ProfitChartDataType>;
    balanceChartSelector: (state: RootState) => TSelectorData<BalanceChartType>;
    statisticCurrencySelector: (state: RootState) => CurrencyEnum;
    idSelector: (state: RootState) => string;
    statisticPeriodSelector: (state: RootState) => ChartDefaultPeriod;
    getBalanceChart: TGetChartFunc;
    getProfitChart: TGetChartFunc;
  }
) => TUseFundChartStateDataMethods;
export const useChartStateDataCreator: TUseFundChartStateDataCreator = ({
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
  >([]);
  useEffect(
    () => {
      setSelectedCurrencies(
        platformCurrencies.filter(({ name }) => name === statisticCurrency)
      );
    },
    [platformCurrencies, statisticCurrency]
  );
  useEffect(
    () => {
      if (!selectedCurrencies.length || !id || !period) return;
      const currencies = selectedCurrencies.map(({ name }) => name);
      const opts = {
        id,
        period,
        currencies
      };
      dispatch(getBalanceChart(opts));
      dispatch(getProfitChart(opts));
    },
    [period, id, selectedCurrencies, dispatch, getBalanceChart, getProfitChart]
  );
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
  useFundChartStateData: TUseFundChartStateData
) => {
  selectedCurrencies: TChartCurrency[];
  selectCurrencies: TChartCurrency[];
  addCurrency: TAddChartCurrency;
  removeCurrency: TRemoveChartCurrency;
  changeCurrency: TChangeChartCurrency;
};
export const useFundChartStateValuesCreator: TUseFundChartStateValuesCreator = useFundChartStateData => {
  const dispatch = useDispatch();
  const {
    statisticCurrencyAction,
    platformCurrencies,
    selectedCurrencies,
    setSelectedCurrencies
  } = useFundChartStateData();
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

  const addCurrency = useCallback(
    currency => {
      setSelectedCurrencies([
        ...selectedCurrencies,
        selectCurrencies.find(({ name }) => name === currency)!
      ]);
    },
    [setSelectedCurrencies, selectedCurrencies, selectCurrencies]
  );
  const removeCurrency = useCallback(
    (name: string) => {
      setSelectedCurrencies([
        ...selectedCurrencies.filter(item => item.name !== name)
      ]);
    },
    [selectedCurrencies, setSelectedCurrencies]
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
    [
      selectedCurrencies,
      platformCurrencies,
      setSelectedCurrencies,
      dispatch,
      statisticCurrencyAction
    ]
  );
  return {
    addCurrency,
    removeCurrency,
    changeCurrency,
    selectedCurrencies,
    selectCurrencies
  };
};
