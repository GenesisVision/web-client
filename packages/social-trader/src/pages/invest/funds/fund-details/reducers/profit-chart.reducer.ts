import { FundProfitPercentCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_FUND_PROFIT_CHART } from "../fund-details.constants";

export type FundProfitChartDataType = FundProfitPercentCharts;

export type FundProfitChartState = IApiState<FundProfitChartDataType>;

export type TFundProfitChartSelector = (
  state: RootState
) => FundProfitChartDataType | undefined;

export const fundProfitChartSelector: TFundProfitChartSelector = apiSelector<
  FundProfitChartDataType,
  RootState
>(state => state.fundDetails.profitChart);

const fundProfitChartReducer = apiReducerFactory<FundProfitChartDataType>({
  apiType: FETCH_FUND_PROFIT_CHART
});

export default fundProfitChartReducer;
