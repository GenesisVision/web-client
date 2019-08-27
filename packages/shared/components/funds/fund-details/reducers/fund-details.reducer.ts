import { FundAssetsListInfo, ReallocationsViewModel } from "gv-api-web";
import { combineReducers } from "redux";
import clearableReducer from "shared/reducers/clearable.reducer";

import { ITableState } from "../../../table/reducers/table.reducer";
import fundBalanceChartReducer, {
  FundBalanceChartState
} from "./balance-chart.reducer";
import fundDescriptionReducer, {
  FundDescriptionState
} from "./description.reducer";
import fundReallocateHistoryReducer from "./fund-reallocate-history.reducer";
import fundStructureReducer from "./fund-structure.reducer";
import fundProfitChartReducer, {
  FundProfitChartState
} from "./profit-chart.reducer";
import statisticCurrencyReducer, {
  StatisticCurrencyState
} from "./statistic-currency.reducer";
import statisticPeriodReducer, {
  StatisticPeriodState
} from "./statistic-period.reducer";

export type FundAssetsViewModel = FundAssetsListInfo & { total: number };
type FundDetailsDataType = Readonly<{
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  profitChart: FundProfitChartState;
  balanceChart: FundBalanceChartState;
  description: FundDescriptionState;
  reallocateHistory: ITableState<ReallocationsViewModel>;
  fundStructure: ITableState<FundAssetsViewModel>;
}>;

export type FundDetailsState = FundDetailsDataType;

const fundDetailsReducer = clearableReducer(
  combineReducers<FundDetailsState>({
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    description: fundDescriptionReducer,
    profitChart: fundProfitChartReducer,
    balanceChart: fundBalanceChartReducer,
    reallocateHistory: fundReallocateHistoryReducer,
    fundStructure: fundStructureReducer
  })
);

export default fundDetailsReducer;
