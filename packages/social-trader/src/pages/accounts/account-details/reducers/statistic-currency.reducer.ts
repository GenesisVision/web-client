import statisticCurrencyReducerCreator from "components/details/reducers/statistic-currency.reducer";
import { fieldSelector } from "utils/selectors";

import { SET_ACCOUNT_STATISTIC_CURRENCY } from "../account-details.constants";

export const statisticCurrencySelector = fieldSelector(
  state => state.accountDetails.statisticCurrency
);

const statisticCurrencyReducer = statisticCurrencyReducerCreator(
  SET_ACCOUNT_STATISTIC_CURRENCY
);
export default statisticCurrencyReducer;
