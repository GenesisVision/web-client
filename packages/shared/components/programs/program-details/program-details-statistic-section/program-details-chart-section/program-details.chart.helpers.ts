import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { HandlePeriodChangeType } from "shared/utils/types";

import { statisticPeriodAction } from "../../actions/program-details.actions";
import { statisticPeriodSelector } from "../../reducers/statistic-period.reducer";

type TUseChartPeriod = () => {
  period: ChartDefaultPeriod;
  setPeriod: HandlePeriodChangeType;
};
export const useChartPeriod: TUseChartPeriod = () => {
  const period = useSelector(statisticPeriodSelector);
  const dispatch = useDispatch();
  const setPeriod = useCallback(
    period => {
      dispatch(statisticPeriodAction(period));
    },
    [dispatch]
  );
  return {
    period,
    setPeriod
  };
};
