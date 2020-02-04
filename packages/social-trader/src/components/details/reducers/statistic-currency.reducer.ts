import { initialAccountCurrencyState } from "reducers/account-settings-reducer";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { ActionType, CurrencyEnum } from "utils/types";

export type StatisticCurrencyDataType = CurrencyEnum;
export type TStatisticCurrencyAction = ActionType<StatisticCurrencyDataType>;
export type StatisticCurrencyState = StatisticCurrencyDataType;

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
