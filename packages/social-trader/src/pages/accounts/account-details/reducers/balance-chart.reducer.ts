import { ProgramBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_ACCOUNT_BALANCE_CHART } from "../account-details.constants";

export type AccountBalanceChartDataType = ProgramBalanceChart;

export type AccountBalanceChartState = IApiState<AccountBalanceChartDataType>;

export const accountBalanceChartSelector = apiSelector<
  AccountBalanceChartDataType,
  RootState
>(state => state.accountDetails.balanceChart);

const accountBalanceChartReducer = apiReducerFactory<
  AccountBalanceChartDataType
>({
  apiType: FETCH_ACCOUNT_BALANCE_CHART
});

export default accountBalanceChartReducer;
