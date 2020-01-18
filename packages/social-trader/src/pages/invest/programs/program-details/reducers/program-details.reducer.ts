import { StatisticCurrencyState } from "components/details/reducers/statistic-currency.reducer";
import { StatisticPeriodState } from "components/details/reducers/statistic-period.reducer";
import programAbsoluteProfitChartReducer, {
  ProgramAbsoluteProfitChartState
} from "pages/invest/programs/program-details/reducers/absolute-profit-chart.reducer";
import statisticCurrencyReducer from "pages/invest/programs/program-details/reducers/statistic-currency.reducer";
import statisticPeriodReducer from "pages/invest/programs/program-details/reducers/statistic-period.reducer";
import clearableReducer from "reducers/clearable.reducer";
import { combineReducers } from "redux";

import programBalanceChartReducer, {
  ProgramBalanceChartState
} from "./balance-chart.reducer";
import programDescriptionReducer, {
  ProgramDescriptionState
} from "./description.reducer";
import programIdReducer, { ProgramIdState } from "./id.reducer";
import levelParametersReducer, {
  LevelParametersState
} from "./level-parameters.reducer";
import programProfitChartReducer, {
  ProgramProfitChartState
} from "./profit-chart.reducer";
import programHistoryReducer, {
  ProgramHistoryState
} from "./program-history.reducer";

type ProgramDetailsDataType = Readonly<{
  id: ProgramIdState;
  statisticPeriod: StatisticPeriodState;
  statisticCurrency: StatisticCurrencyState;
  profitChart: ProgramProfitChartState;
  absoluteProfitChart: ProgramAbsoluteProfitChartState;
  balanceChart: ProgramBalanceChartState;
  description: ProgramDescriptionState;
  levelParameters: LevelParametersState;
  programHistory: ProgramHistoryState;
}>;

export type ProgramDetailsState = ProgramDetailsDataType;

const programDetailsReducer = clearableReducer(
  combineReducers<ProgramDetailsState>({
    id: programIdReducer,
    statisticPeriod: statisticPeriodReducer,
    statisticCurrency: statisticCurrencyReducer,
    levelParameters: levelParametersReducer,
    description: programDescriptionReducer,
    profitChart: programProfitChartReducer,
    absoluteProfitChart: programAbsoluteProfitChartReducer,
    balanceChart: programBalanceChartReducer,
    programHistory: programHistoryReducer
  })
);

export default programDetailsReducer;
