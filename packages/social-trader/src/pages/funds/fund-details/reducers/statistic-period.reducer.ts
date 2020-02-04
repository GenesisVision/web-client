import statisticPeriodReducerCreator from "components/details/reducers/statistic-period.reducer";
import { fieldSelector } from "utils/selectors";

import { SET_FUND_STATISTIC_PERIOD } from "../fund-details.constants";

export const statisticPeriodSelector = fieldSelector(
  state => state.fundDetails.statisticPeriod
);

const statisticPeriodReducer = statisticPeriodReducerCreator(
  SET_FUND_STATISTIC_PERIOD
);

export default statisticPeriodReducer;
