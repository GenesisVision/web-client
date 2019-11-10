import { FundProfitCharts } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "shared/reducers/reducer-creators/api-reducer";
import { RootState } from "shared/reducers/root-reducer";
import { apiSelector } from "shared/utils/selectors";

import { FETCH_FUND_PROFIT_CHART } from "../actions/fund-details.actions";

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
