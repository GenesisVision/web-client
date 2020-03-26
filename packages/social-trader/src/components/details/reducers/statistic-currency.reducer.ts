import defaultReducer from "reducers/reducer-creators/default-reducer";
import { getAccountCurrency } from "utils/account-currency";
import { ActionType, CurrencyEnum } from "utils/types";

export type StatisticCurrencyDataType = CurrencyEnum;
export type TStatisticCurrencyAction = ActionType<StatisticCurrencyDataType>;
export type StatisticCurrencyState = StatisticCurrencyDataType;

export const initialAccountCurrencyState = getAccountCurrency();

const initialState: StatisticCurrencyState = initialAccountCurrencyState;

const statisticCurrencyReducerCreator = (type: string) => (
  state: StatisticCurrencyState = initialState,
  action: TStatisticCurrencyAction
): StatisticCurrencyDataType =>
  defaultReducer<TStatisticCurrencyAction, StatisticCurrencyDataType>(
    action,
    state,
    initialState,
    type
  );

export default statisticCurrencyReducerCreator;
