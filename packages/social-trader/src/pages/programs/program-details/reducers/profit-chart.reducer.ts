import { ProgramProfitPercentCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_PROGRAM_PROFIT_CHART } from "../program-details.constants";

export type ProgramProfitChartDataType = ProgramProfitPercentCharts;

export type ProgramProfitChartState = IApiState<ProgramProfitChartDataType>;

export const programProfitChartSelector = apiSelector<
  ProgramProfitChartDataType,
  RootState
>(state => state.programDetails.profitChart);

const programProfitChartReducer = apiReducerFactory<ProgramProfitChartDataType>(
  {
    apiType: FETCH_PROGRAM_PROFIT_CHART
  }
);

export default programProfitChartReducer;
