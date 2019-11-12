import { ProgramProfitChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { FETCH_FOLLOW_PROFIT_CHART } from "../follow-details.constants";

export type FollowProfitChartDataType = Array<ProgramProfitChart>;

export type FollowProfitChartState = IApiState<FollowProfitChartDataType>;

export const followProfitChartSelector = apiSelector<
  FollowProfitChartDataType,
  RootState
>(state => state.followDetails.profitChart);

const followProfitChartReducer = apiReducerFactory<FollowProfitChartDataType>({
  apiType: FETCH_FOLLOW_PROFIT_CHART
});

export default followProfitChartReducer;
