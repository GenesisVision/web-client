import { AccountProfitPercentCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_ACCOUNT_PROFIT_CHART } from "../account-details.constants";

export type AccountProfitChartDataType = AccountProfitPercentCharts;

export type AccountProfitChartState = IApiState<AccountProfitChartDataType>;

export const accountProfitChartSelector = apiSelector<
  AccountProfitChartDataType,
  RootState
>(state => state.accountDetails.profitChart);

const accountProfitChartReducer = apiReducerFactory<AccountProfitChartDataType>(
  {
    apiType: FETCH_ACCOUNT_PROFIT_CHART
  }
);

export default accountProfitChartReducer;
