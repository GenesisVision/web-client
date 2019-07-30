import { combineReducers } from "redux";
import clearableReducer from "shared/reducers/clearable.reducer";

import fundBalanceChartReducer, {
  FundBalanceChartState
} from "./balance-chart.reducer";
import fundDescriptionReducer, {
  FundDescriptionState
} from "./description.reducer";
import fundProfitChartReducer, {
  FundProfitChartState
} from "./profit-chart.reducer";

type FundDetailsDataType = Readonly<{
  profitChart: FundProfitChartState;
  balanceChart: FundBalanceChartState;
  description: FundDescriptionState;
}>;

export type FundDetailsState = FundDetailsDataType;

const fundDetailsReducer = clearableReducer(
  combineReducers<FundDetailsState>({
    description: fundDescriptionReducer,
    profitChart: fundProfitChartReducer,
    balanceChart: fundBalanceChartReducer
  })
);

export default fundDetailsReducer;
