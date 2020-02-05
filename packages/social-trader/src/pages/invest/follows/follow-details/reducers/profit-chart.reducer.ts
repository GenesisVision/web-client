import { ProgramProfitPercentCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_FOLLOW_PROFIT_CHART } from "../follow-details.constants";

export type FollowProfitChartDataType = ProgramProfitPercentCharts;

export type FollowProfitChartState = IApiState<FollowProfitChartDataType>;

export const followProfitChartSelector = apiSelector<
  FollowProfitChartDataType,
  RootState
>(state => state.followDetails.profitChart);

const followProfitChartReducer = apiReducerFactory<FollowProfitChartDataType>({
  apiType: FETCH_FOLLOW_PROFIT_CHART
});

export default followProfitChartReducer;
