import { ProgramBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_PROGRAM_BALANCE_CHART } from "../program-details.constants";

export type ProgramBalanceChartDataType = ProgramBalanceChart;

export type ProgramBalanceChartState = IApiState<ProgramBalanceChartDataType>;

export const programBalanceChartSelector = apiSelector<
  ProgramBalanceChartDataType,
  RootState
>(state => state.programDetails.balanceChart);

const programBalanceChartReducer = apiReducerFactory<
  ProgramBalanceChartDataType
>({
  apiType: FETCH_PROGRAM_BALANCE_CHART
});

export default programBalanceChartReducer;
