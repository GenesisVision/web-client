import statisticPeriodReducerCreator from "shared/components/details/reducers/statistic-period.reducer";
import { fieldSelector } from "shared/utils/selectors";

import { SET_PROGRAM_STATISTIC_PERIOD } from "../actions/follow-details.actions";

export const statisticPeriodSelector = fieldSelector(
  state => state.programDetails.statisticPeriod
);

const statisticPeriodReducer = statisticPeriodReducerCreator(
  SET_PROGRAM_STATISTIC_PERIOD
);

export default statisticPeriodReducer;
