import statisticCurrencyReducerCreator, {
  StatisticCurrencyState
} from "shared/components/details/reducers/statistic-currency.reducer";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import { getCookie } from "shared/utils/cookie";
import { fieldSelector } from "shared/utils/selectors";
import { CurrencyEnum } from "shared/utils/types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

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
