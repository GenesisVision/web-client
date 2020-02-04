import { StatisticCurrencyState } from "components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "components/details/reducers/statistic-period.reducer";
import accountAbsoluteProfitChartReducer, {
  AccountAbsoluteProfitChartState
} from "pages/accounts/account-details/reducers/absolute-profit-chart.reducer";
import statisticCurrencyReducer from "pages/accounts/account-details/reducers/statistic-currency.reducer";
import statisticPeriodReducer from "pages/accounts/account-details/reducers/statistic-period.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import accountHistoryReducer, {
  AccountHistoryState
} from "./account-history.reducer";
import accountBalanceChartReducer, {
  AccountBalanceChartState
} from "./balance-chart.reducer";
import accountDescriptionReducer, {
  AccountDescriptionState
} from "./description.reducer";
import accountIdReducer, { AccountIdState } from "./id.reducer";
import accountProfitChartReducer, {
  AccountProfitChartState
} from "./profit-chart.reducer";

type AccountDetailsDataType = Readonly<{
  id: AccountIdState;
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  absoluteProfitChart: AccountAbsoluteProfitChartState;
  profitChart: AccountProfitChartState;
  balanceChart: AccountBalanceChartState;
  description: AccountDescriptionState;
  accountHistory: AccountHistoryState;
}>;

export type AccountDetailsState = AccountDetailsDataType;

const accountDetailsReducer = clearableReducer(
  combineReducers<AccountDetailsState>({
    id: accountIdReducer,
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    description: accountDescriptionReducer,
    absoluteProfitChart: accountAbsoluteProfitChartReducer,
    profitChart: accountProfitChartReducer,
    balanceChart: accountBalanceChartReducer,
    accountHistory: accountHistoryReducer
  })
);

export default accountDetailsReducer;
