import { ProgramProfitChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

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
