import statisticPeriodReducerCreator from "shared/components/details/reducers/statistic-period.reducer";
import { fieldSelector } from "shared/utils/selectors";

import { SET_FUND_STATISTIC_PERIOD } from "../actions/fund-details.actions";

export const statisticPeriodSelector = fieldSelector(
  state => state.fundDetails.statisticPeriod
);

const statisticPeriodReducer = statisticPeriodReducerCreator(
  SET_FUND_STATISTIC_PERIOD
);

export default statisticPeriodReducer;
