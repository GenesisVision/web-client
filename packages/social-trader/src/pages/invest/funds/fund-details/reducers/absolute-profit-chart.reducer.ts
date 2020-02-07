import { AbsoluteProfitChart } from "gv-api-web";
import apiReducerFactory, {
  IApiState
} from "reducers/reducer-creators/api-reducer";
import { RootState } from "reducers/root-reducer";
import { apiSelector } from "utils/selectors";

import { FETCH_FUND_ABSOLUTE_PROFIT_CHART } from "../fund-details.constants";

export type FundAbsoluteProfitChartDataType = AbsoluteProfitChart;

export type FundAbsoluteProfitChartState = IApiState<
  FundAbsoluteProfitChartDataType
>;

export type TFundAbsoluteProfitChartSelector = (
  state: RootState
) => FundAbsoluteProfitChartDataType | undefined;

export const fundAbsoluteProfitChartSelector: TFundAbsoluteProfitChartSelector = apiSelector<
  FundAbsoluteProfitChartDataType,
  RootState
>(state => state.fundDetails.absoluteProfitChart);

const fundAbsoluteProfitChartReducer = apiReducerFactory<
  FundAbsoluteProfitChartDataType
>({
  apiType: FETCH_FUND_ABSOLUTE_PROFIT_CHART
});

export default fundAbsoluteProfitChartReducer;
