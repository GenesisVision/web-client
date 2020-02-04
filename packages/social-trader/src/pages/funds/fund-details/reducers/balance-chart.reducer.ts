import { FundBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector, TSelectorData } from "utils/selectors";

import { FETCH_FUND_BALANCE_CHART } from "../fund-details.constants";

export type FundBalanceChartDataType = FundBalanceChart;

export type FundBalanceChartState = IApiState<FundBalanceChartDataType>;

export type TFundBalanceChartSelector = (
  state: RootState
) => TSelectorData<FundBalanceChartDataType>;

export const fundBalanceChartSelector: TFundBalanceChartSelector = apiSelector<
  FundBalanceChartDataType,
  RootState
>(state => state.fundDetails.balanceChart);

const fundBalanceChartReducer = apiReducerFactory<FundBalanceChartDataType>({
  apiType: FETCH_FUND_BALANCE_CHART
});

export default fundBalanceChartReducer;
