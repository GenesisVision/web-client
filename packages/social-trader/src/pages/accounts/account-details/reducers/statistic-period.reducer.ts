import statisticPeriodReducerCreator from "components/details/reducers/statistic-period.reducer";
import { fieldSelector } from "utils/selectors";

import { SET_ACCOUNT_STATISTIC_PERIOD } from "../account-details.constants";

export const statisticPeriodSelector = fieldSelector(
  state => state.accountDetails.statisticPeriod
);

const statisticPeriodReducer = statisticPeriodReducerCreator(
  SET_ACCOUNT_STATISTIC_PERIOD
);

export default statisticPeriodReducer;
