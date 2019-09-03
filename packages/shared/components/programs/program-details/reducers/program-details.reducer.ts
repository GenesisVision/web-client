import { combineReducers } from "redux";
import clearableReducer from "shared/reducers/clearable.reducer";

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
  profitChart: ProgramProfitChartState;
  balanceChart: ProgramBalanceChartState;
  description: ProgramDescriptionState;
  levelParameters: LevelParametersState;
  programHistory: ProgramHistoryState;
}>;

export type ProgramDetailsState = ProgramDetailsDataType;

const programDetailsReducer = clearableReducer(
  combineReducers<ProgramDetailsState>({
    id: programIdReducer,
    levelParameters: levelParametersReducer,
    description: programDescriptionReducer,
    profitChart: programProfitChartReducer,
    balanceChart: programBalanceChartReducer,
    programHistory: programHistoryReducer
  })
);

export default programDetailsReducer;
