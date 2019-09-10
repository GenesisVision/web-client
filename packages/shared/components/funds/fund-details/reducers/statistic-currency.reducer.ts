import statisticCurrencyReducerCreator from "shared/components/details/reducers/statistic-currency.reducer";
import { fieldSelector } from "shared/utils/selectors";

import { SET_FUND_STATISTIC_CURRENCY } from "../actions/fund-details.actions";

export const statisticCurrencySelector = fieldSelector(
  state => state.fundDetails.statisticCurrency
);

const statisticCurrencyReducer = statisticCurrencyReducerCreator(
  SET_FUND_STATISTIC_CURRENCY
);
export default statisticCurrencyReducer;
