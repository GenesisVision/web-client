import { TGetChartFunc } from "components/details/details-statistic-section/details.chart.types";
import { FilteringType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import { NextPageContext } from "next";
import { RootState } from "reducers/root-reducer";
import { Dispatch } from "redux";
import { Token } from "services/api-client/swagger-custom-client";
import authService from "services/auth-service";
import { CurrencyEnum, MiddlewareDispatch, TGetState } from "utils/types";

import {
  fetchFundAbsoluteProfitChartAction,
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  fundReallocateHistoryAction,
  setFundIdAction
} from "../actions/fund-details.actions";
import { fundReallocateHistoryTableSelector } from "../reducers/fund-reallocate-history.reducer";

export const dispatchFundDescriptionWithId = (
  id: string,
  auth = Token.create(),
  currency: CurrencyEnum = "GVT"
) => async (dispatch: MiddlewareDispatch) =>
  await dispatch(fetchFundDescriptionAction(id, auth, currency));

export const dispatchFundDescription = (
  ctx?: NextPageContext,
  currency?: CurrencyEnum
) => async (dispatch: MiddlewareDispatch, getState: TGetState) => {
  const {
    fundDetails: { id: stateId }
  } = getState();
  return await dispatch(
    dispatchFundDescriptionWithId(
      ctx ? (ctx.query.id as string) : stateId,
      Token.create(ctx),
      currency
    )
  );
};

export const dispatchFundId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setFundIdAction(id));

// export const fetchFundStructure = (
//   fundId: string
// ): Promise<FundAssetsListInfo> => {
//   return fundsApi.getFundAssets(fundId);
// };
export const getDashboardHistoryDetailsCounts = (fundId: string) => (
  dispatch: Dispatch,
  getState: () => RootState
) => {
  const commonFiltering = { take: 0 };

  const reallocateHistoryCountFilters = composeRequestFiltersByTableState(
    fundReallocateHistoryTableSelector(getState())
  );
  dispatch(
    getFundReallocateHistory(fundId)({
      ...reallocateHistoryCountFilters,
      ...commonFiltering
    })
  );
};

export const getFundReallocateHistory = (fundId: string) => (
  filters?: FilteringType
) => {
  return fundReallocateHistoryAction(fundId, filters);
};

/*export const getFundStructure = (fundId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fundStructureAction(fundId);
};*/

export const getAbsoluteProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch =>
  dispatch(fetchFundAbsoluteProfitChartAction(id, period, currencies[0]));

export const getProfitChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch => dispatch(fetchFundProfitChartAction(id, period, currencies));

export const getBalanceChart: TGetChartFunc = ({
  id,
  period,
  currencies
}) => dispatch => {
  dispatch(fetchFundBalanceChartAction(id, period, currencies[0]));
};
