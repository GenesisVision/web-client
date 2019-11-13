import { NextPageContext } from "next";
import { Dispatch } from "redux";
import { TGetChartFunc } from "shared/components/details/details-statistic-section/details.chart.helpers";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import authService from "shared/services/auth-service";
import {
  CurrencyEnum,
  MiddlewareDispatch,
  TGetState
} from "shared/utils/types";
import { RootState } from "social-trader-web-portal/src/reducers/root-reducer";

import {
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  fundReallocateHistoryAction,
  setFundIdAction
} from "../actions/fund-details.actions";
import { fundReallocateHistoryTableSelector } from "../reducers/fund-reallocate-history.reducer";

export const dispatchFundDescriptionWithId = (
  id: string,
  auth = authService.getAuthArg(),
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
      authService.getAuthArg(ctx),
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
