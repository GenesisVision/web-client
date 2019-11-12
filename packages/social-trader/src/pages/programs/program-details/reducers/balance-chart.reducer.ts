import { ProgramBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

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
