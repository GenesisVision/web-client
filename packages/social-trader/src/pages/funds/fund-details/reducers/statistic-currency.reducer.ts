import statisticCurrencyReducerCreator, {
  StatisticCurrencyState
} from "components/details/reducers/statistic-currency.reducer";
import { initialAccountCurrencyState } from "reducers/account-settings-reducer";
import { RootState } from "reducers/root-reducer";
import { fieldSelector } from "utils/selectors";

import { SET_FUND_STATISTIC_CURRENCY } from "../fund-details.constants";

const initialState = initialAccountCurrencyState;

export type TStatisticCurrencySelector = (
  state: RootState
) => StatisticCurrencyState;

export const statisticCurrencySelector: TStatisticCurrencySelector = fieldSelector(
  state => state.fundDetails.statisticCurrency
);

const statisticCurrencyReducer = statisticCurrencyReducerCreator(
  SET_FUND_STATISTIC_CURRENCY
);
export default statisticCurrencyReducer;
