import { AbsoluteProfitChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_ACCOUNT_ABSOLUTE_PROFIT_CHART } from "../account-details.constants";

export type AccountAbsoluteProfitChartDataType = AbsoluteProfitChart;

export type AccountAbsoluteProfitChartState = IApiState<
  AccountAbsoluteProfitChartDataType
>;

export const accountAbsoluteProfitChartSelector = apiSelector<
  AccountAbsoluteProfitChartDataType,
  RootState
>(state => state.accountDetails.absoluteProfitChart);

const accountAbsoluteProfitChartReducer = apiReducerFactory<
  AccountAbsoluteProfitChartDataType
>({
  apiType: FETCH_ACCOUNT_ABSOLUTE_PROFIT_CHART
});

export default accountAbsoluteProfitChartReducer;
