import { AbsoluteProfitChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART } from "../follow-details.constants";

export type FollowAbsoluteProfitChartDataType = AbsoluteProfitChart;

export type FollowAbsoluteProfitChartState = IApiState<
  FollowAbsoluteProfitChartDataType
>;

export const followAbsoluteProfitChartSelector = apiSelector<
  FollowAbsoluteProfitChartDataType,
  RootState
>(state => state.followDetails.absoluteProfitChart);

const followAbsoluteProfitChartReducer = apiReducerFactory<
  FollowAbsoluteProfitChartDataType
>({
  apiType: FETCH_FOLLOW_ABSOLUTE_PROFIT_CHART
});

export default followAbsoluteProfitChartReducer;
