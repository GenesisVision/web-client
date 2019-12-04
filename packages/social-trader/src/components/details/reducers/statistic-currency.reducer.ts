import { ACCOUNT_CURRENCY_KEY } from "middlewares/update-account-settings-middleware/update-account-settings-middleware";
import defaultReducer from "reducers/reducer-creators/default-reducer";
import { getCookie } from "shared/utils/cookie";
import { ActionType, CurrencyEnum } from "utils/types";

export type StatisticCurrencyDataType = CurrencyEnum;
export type TStatisticCurrencyAction = ActionType<StatisticCurrencyDataType>;
export type StatisticCurrencyState = StatisticCurrencyDataType;

const initialState: StatisticCurrencyState =
  (getCookie(ACCOUNT_CURRENCY_KEY) as StatisticCurrencyDataType) || "BTC";

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
