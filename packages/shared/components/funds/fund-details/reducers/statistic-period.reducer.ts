import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "shared/components/chart/chart-period/chart-period.helpers";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { fieldSelector } from "shared/utils/selectors";

import {
  SET_FUND_STATISTIC_PERIOD,
  TStatisticPeriodAction
} from "../actions/fund-details.actions";

export type StatisticPeriodDataType = ChartDefaultPeriod;

const initialState = DEFAULT_PERIOD;

export type StatisticPeriodState = StatisticPeriodDataType;

export const statisticPeriodSelector = fieldSelector(
  state => state.fundDetails.statisticPeriod
);

const statisticPeriodReducer = (
  state: StatisticPeriodState = initialState,
  action: TStatisticPeriodAction
): StatisticPeriodDataType =>
  defaultReducer<TStatisticPeriodAction, StatisticPeriodDataType>(
    action,
    state,
    initialState,
    SET_FUND_STATISTIC_PERIOD
  );

export default statisticPeriodReducer;
