import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART } from "../program-details.constants";
import { ProgramAbsoluteProfitChartDataType } from "../program-details.types";

export type ProgramAbsoluteProfitChartState = IApiState<
  ProgramAbsoluteProfitChartDataType
>;

export const programAbsoluteProfitChartSelector = apiSelector<
  ProgramAbsoluteProfitChartDataType,
  RootState
>(state => state.programDetails.absoluteProfitChart);

const programAbsoluteProfitChartReducer = apiReducerFactory<
  ProgramAbsoluteProfitChartDataType
>({
  apiType: FETCH_PROGRAM_ABSOLUTE_PROFIT_CHART
});

export default programAbsoluteProfitChartReducer;
