import statisticCurrencyReducerCreator from "components/details/reducers/statistic-currency.reducer";
import { fieldSelector } from "utils/selectors";

import { SET_FOLLOW_STATISTIC_CURRENCY } from "../follow-details.constants";

export const statisticCurrencySelector = fieldSelector(
  state => state.followDetails.statisticCurrency
);

const statisticCurrencyReducer = statisticCurrencyReducerCreator(
  SET_FOLLOW_STATISTIC_CURRENCY
);
export default statisticCurrencyReducer;
