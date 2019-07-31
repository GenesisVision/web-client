import { combineReducers } from "redux";
import clearableReducer from "shared/reducers/clearable.reducer";

import fundIdReducer, { FundIdState } from "../reducers/id.reducer";
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
  id: FundIdState;
  profitChart: FundProfitChartState;
  balanceChart: FundBalanceChartState;
  description: FundDescriptionState;
}>;

export type FundDetailsState = FundDetailsDataType;

const fundDetailsReducer = clearableReducer(
  combineReducers<FundDetailsState>({
    id: fundIdReducer,
    description: fundDescriptionReducer,
    profitChart: fundProfitChartReducer,
    balanceChart: fundBalanceChartReducer
  })
);

export default fundDetailsReducer;
