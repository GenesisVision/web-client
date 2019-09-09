import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { TChartCurrency } from "shared/modules/chart-currency-selector/chart-currency-selector";
import { RootState } from "shared/reducers/root-reducer";
import { HandlePeriodChangeType } from "shared/utils/types";

import {
  StatisticPeriodState,
  TStatisticPeriodAction
} from "../reducers/statistic-period.reducer";

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
