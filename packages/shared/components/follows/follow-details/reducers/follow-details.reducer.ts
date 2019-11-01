import { combineReducers } from "redux";
import { StatisticCurrencyState } from "shared/components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "shared/components/details/reducers/statistic-period.reducer";
import statisticCurrencyReducer from "shared/components/programs/program-details/reducers/statistic-currency.reducer";
import statisticPeriodReducer from "shared/components/programs/program-details/reducers/statistic-period.reducer";
import clearableReducer from "shared/reducers/clearable.reducer";

import programBalanceChartReducer, {
  ProgramBalanceChartState
} from "./balance-chart.reducer";
import programDescriptionReducer, {
  ProgramDescriptionState
} from "./description.reducer";
import followHistoryReducer, {
  ProgramHistoryState
} from "./follow-history.reducer";
import programIdReducer, { ProgramIdState } from "./id.reducer";
import levelParametersReducer, {
  LevelParametersState
} from "./level-parameters.reducer";
import programProfitChartReducer, {
  ProgramProfitChartState
} from "./profit-chart.reducer";

type ProgramDetailsDataType = Readonly<{
  id: ProgramIdState;
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  profitChart: ProgramProfitChartState;
  balanceChart: ProgramBalanceChartState;
  description: ProgramDescriptionState;
  levelParameters: LevelParametersState;
  programHistory: ProgramHistoryState;
}>;

export type ProgramDetailsState = ProgramDetailsDataType;

const followDetailsReducer = clearableReducer(
  combineReducers<ProgramDetailsState>({
    id: programIdReducer,
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    levelParameters: levelParametersReducer,
    description: programDescriptionReducer,
    profitChart: programProfitChartReducer,
    balanceChart: programBalanceChartReducer,
    programHistory: followHistoryReducer
  })
);

export default followDetailsReducer;
