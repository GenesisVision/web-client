import { ProgramBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { FETCH_FOLLOW_BALANCE_CHART } from "../follow-details.constants";

export type FollowBalanceChartDataType = ProgramBalanceChart;

export type FollowBalanceChartState = IApiState<FollowBalanceChartDataType>;

export const followBalanceChartSelector = apiSelector<
  FollowBalanceChartDataType,
  RootState
>(state => state.followDetails.balanceChart);

const followBalanceChartReducer = apiReducerFactory<FollowBalanceChartDataType>(
  {
    apiType: FETCH_FOLLOW_BALANCE_CHART
  }
);

export default followBalanceChartReducer;
