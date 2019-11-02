import { combineReducers } from "redux";
import { StatisticCurrencyState } from "shared/components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "shared/components/details/reducers/statistic-period.reducer";
import statisticCurrencyReducer from "shared/components/programs/program-details/reducers/statistic-currency.reducer";
import statisticPeriodReducer from "shared/components/programs/program-details/reducers/statistic-period.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import followBalanceChartReducer, {
  FollowBalanceChartState
} from "./balance-chart.reducer";
import followDescriptionReducer, {
  FollowDescriptionState
} from "./description.reducer";
import followHistoryReducer, {
  FollowHistoryState
} from "./follow-history.reducer";
import followIdReducer, { FollowIdState } from "./id.reducer";
import followProfitChartReducer, {
  FollowProfitChartState
} from "./profit-chart.reducer";

type FollowDetailsDataType = Readonly<{
  id: FollowIdState;
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  profitChart: FollowProfitChartState;
  balanceChart: FollowBalanceChartState;
  description: FollowDescriptionState;
  followHistory: FollowHistoryState;
}>;

export type FollowDetailsState = FollowDetailsDataType;

const followDetailsReducer = clearableReducer(
  combineReducers<FollowDetailsState>({
    id: followIdReducer,
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    description: followDescriptionReducer,
    profitChart: followProfitChartReducer,
    balanceChart: followBalanceChartReducer,
    followHistory: followHistoryReducer
  })
);

export default followDetailsReducer;
