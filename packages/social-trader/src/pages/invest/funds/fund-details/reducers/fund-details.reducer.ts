import { StatisticCurrencyState } from "components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "components/details/reducers/statistic-period.reducer";
import fundAbsoluteProfitChartReducer, {
  FundAbsoluteProfitChartState
} from "pages/invest/funds/fund-details/reducers/absolute-profit-chart.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import fundBalanceChartReducer, {
  FundBalanceChartState
} from "./balance-chart.reducer";
import fundDescriptionReducer, {
  FundDescriptionState
} from "./description.reducer";
import fundHistoryReducer, { FundHistoryState } from "./fund-history.reducer";
import fundIdReducer, { FundIdState } from "./id.reducer";
import fundProfitChartReducer, {
  FundProfitChartState
} from "./profit-chart.reducer";
import statisticCurrencyReducer from "./statistic-currency.reducer";
import statisticPeriodReducer from "./statistic-period.reducer";

type FundDetailsDataType = Readonly<{
  id: FundIdState;
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  absoluteProfitChart: FundAbsoluteProfitChartState;
  profitChart: FundProfitChartState;
  balanceChart: FundBalanceChartState;
  description: FundDescriptionState;
  fundHistory: FundHistoryState;
}>;

export type FundDetailsState = FundDetailsDataType;

const fundDetailsReducer = clearableReducer(
  combineReducers<FundDetailsState>({
    id: fundIdReducer,
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    description: fundDescriptionReducer,
    absoluteProfitChart: fundAbsoluteProfitChartReducer,
    profitChart: fundProfitChartReducer,
    balanceChart: fundBalanceChartReducer,
    fundHistory: fundHistoryReducer
  })
);

export default fundDetailsReducer;
