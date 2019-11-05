import { ProgramProfitCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

// import { FETCH_PROGRAM_PROFIT_CHART } from "../actions/program-details.actions"; TODO fix imports

const FETCH_PROGRAM_PROFIT_CHART = "FETCH_PROGRAM_PROFIT_CHART";

export type ProgramProfitChartState = IApiState<ProgramProfitCharts>;

export const programProfitChartSelector = apiSelector<
  ProgramProfitCharts,
  RootState
>(state => state.programDetails.profitChart);

const programProfitChartReducer = apiReducerFactory<ProgramProfitCharts>({
  apiType: FETCH_PROGRAM_PROFIT_CHART
});

export default programProfitChartReducer;
