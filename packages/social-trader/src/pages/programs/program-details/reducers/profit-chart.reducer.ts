import { ProgramProfitCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

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
