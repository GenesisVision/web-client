import { StatisticCurrencyState } from "components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "components/details/reducers/statistic-period.reducer";
import followAbsoluteProfitChartReducer, {
  FollowAbsoluteProfitChartState
} from "pages/follows/follow-details/reducers/absolute-profit-chart.reducer";
import statisticCurrencyReducer from "pages/follows/follow-details/reducers/statistic-currency.reducer";
import statisticPeriodReducer from "pages/follows/follow-details/reducers/statistic-period.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

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
  absoluteProfitChart: FollowAbsoluteProfitChartState;
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
    absoluteProfitChart: followAbsoluteProfitChartReducer,
    profitChart: followProfitChartReducer,
    balanceChart: followBalanceChartReducer,
    followHistory: followHistoryReducer
  })
);

export default followDetailsReducer;
