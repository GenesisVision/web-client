import { ProgramBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_PROGRAM_BALANCE_CHART } from "../actions/follow-details.actions";

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
