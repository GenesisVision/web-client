import {
  ChartDefaultPeriod,
  DEFAULT_PERIOD
} from "components/chart/chart-period/chart-period.helpers";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { ActionType } from "utils/types";

export type StatisticPeriodDataType = ChartDefaultPeriod;
export type TStatisticPeriodAction = ActionType<StatisticPeriodDataType>;
export type StatisticPeriodState = StatisticPeriodDataType;

const initialState: StatisticPeriodState = DEFAULT_PERIOD;

const statisticPeriodReducerCreator = (type: string) => (
  state: StatisticPeriodState = initialState,
  action: TStatisticPeriodAction
): StatisticPeriodDataType =>
  defaultReducer<TStatisticPeriodAction, StatisticPeriodDataType>(
    action,
    state,
    initialState,
    type
  );

export default statisticPeriodReducerCreator;
