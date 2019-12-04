import statisticCurrencyReducerCreator, {
  StatisticCurrencyState
} from "components/details/reducers/statistic-currency.reducer";
import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { RootState } from "reducers/root-reducer";
import { getCookie } from "shared/utils/cookie";
import { fieldSelector } from "utils/selectors";
import { CurrencyEnum } from "utils/types";

import { SET_FUND_STATISTIC_CURRENCY } from "../fund-details.constants";

const initialState = (getCookie(ACCOUNT_CURRENCY_KEY) as CurrencyEnum) || "BTC";

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
