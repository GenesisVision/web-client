import statisticCurrencyReducerCreator from "shared/components/details/reducers/statistic-currency.reducer";
import { StatisticCurrencyState } from "shared/components/details/reducers/statistic-currency.reducer";
import { RootState } from "shared/reducers/root-reducer";
import { fieldSelector } from "shared/utils/selectors";

import { SET_FUND_STATISTIC_CURRENCY } from "../actions/fund-details.actions";

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
