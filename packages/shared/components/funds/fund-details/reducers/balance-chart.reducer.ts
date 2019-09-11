import { FundBalanceChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { TSelectorData, apiSelector } from "shared/utils/selectors";

import { FETCH_FUND_BALANCE_CHART } from "../actions/fund-details.actions";

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
