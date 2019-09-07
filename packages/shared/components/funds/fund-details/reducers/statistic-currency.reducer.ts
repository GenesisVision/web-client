import { ACCOUNT_CURRENCY_KEY } from "shared/middlewares/update-account-settings-middleware/update-account-settings-middleware";
import defaultReducer from "shared/reducers/reducer-creators/default-reducer";
import { loadData } from "shared/utils/localstorage";
import { fieldSelector } from "shared/utils/selectors";
import { CurrencyEnum } from "shared/utils/types";

import {
  SET_FUND_STATISTIC_CURRENCY,
  TStatisticCurrencyAction
} from "../actions/fund-details.actions";

export type StatisticCurrencyDataType = CurrencyEnum;

const initialState = (loadData(ACCOUNT_CURRENCY_KEY) as CurrencyEnum) || "BTC";

export type StatisticCurrencyState = StatisticCurrencyDataType;

export const statisticCurrencySelector = fieldSelector(
  state => state.fundDetails.statisticCurrency
);

const statisticCurrencyReducer = (
  state: StatisticCurrencyState = initialState,
  action: TStatisticCurrencyAction
): StatisticCurrencyDataType =>
  defaultReducer<TStatisticCurrencyAction, StatisticCurrencyDataType>(
    action,
    state,
    initialState,
    SET_FUND_STATISTIC_CURRENCY
  );

export default statisticCurrencyReducer;
