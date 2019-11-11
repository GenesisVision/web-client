import { ProgramProfitCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_PROGRAM_PROFIT_CHART } from "../program-details.constants";

export type ProgramProfitChartDataType = ProgramProfitCharts;

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
