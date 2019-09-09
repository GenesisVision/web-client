import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { RootState } from "shared/reducers/root-reducer";
import { HandlePeriodChangeType } from "shared/utils/types";

import {
  StatisticPeriodState,
  TStatisticPeriodAction
} from "../reducers/statistic-period.reducer";

type TUseChartPeriod = (
  selector: (state: RootState) => StatisticPeriodState,
  action: (period: ChartDefaultPeriod) => TStatisticPeriodAction
) => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};
export const useChartPeriodCreator: TUseChartPeriod = (selector, action) => {
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
