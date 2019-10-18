import statisticCurrencyReducerCreator from "shared/components/details/reducers/statistic-currency.reducer";
import { StatisticCurrencyState } from "shared/components/details/reducers/statistic-currency.reducer";
import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { getCookie } from "shared/utils/cookie";
import { fieldSelector } from "shared/utils/selectors";
import { CurrencyEnum } from "shared/utils/types";

import {
  SET_STATISTIC_CURRENCY,
  TStatisticCurrencyAction
} from "../actions/fund-details.actions";
import { SET_FUND_STATISTIC_CURRENCY } from "../actions/fund-details.actions";

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
