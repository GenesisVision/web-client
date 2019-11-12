import { FundProfitCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { apiSelector } from "shared/utils/selectors";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import { FETCH_FUND_PROFIT_CHART } from "../fund-details.constants";

export type FundProfitChartDataType = FundProfitCharts;

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
