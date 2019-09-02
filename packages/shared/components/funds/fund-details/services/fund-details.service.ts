import { FundAssetsListInfo } from "gv-api-web";
import { NextPageContext } from "next";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import {
  ComposeFiltersAllType,
  FilteringType
} from "shared/components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import { RootState } from "shared/reducers/root-reducer";
import fundsApi from "shared/services/api-client/funds-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, TGetState } from "shared/utils/types";
import { CurrencyEnum } from "shared/utils/types";

import {
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  fundReallocateHistoryAction,
  fundStructureAction,
  setFundIdAction
} from "../actions/fund-details.actions";
import { fundReallocateHistoryTableSelector } from "../reducers/fund-reallocate-history.reducer";

export const dispatchFundDescription = (ctx?: NextPageContext) => async (
  dispatch: MiddlewareDispatch,
  getState: TGetState
) => {
  const {
    fundDetails: { id: stateId }
  } = getState();
  return await dispatch(
    fetchFundDescriptionAction(
      ctx ? (ctx.query.id as string) : stateId,
      authService.getAuthArg(ctx)
    )
  );
};

export const dispatchFundId = (id: string) => async (
  dispatch: MiddlewareDispatch
) => await dispatch(setFundIdAction(id));

export const fetchFundStructure = (
  fundId: string
): Promise<FundAssetsListInfo> => {
  return fundsApi.v10FundsByIdAssetsGet(fundId);
};
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

export const getFundStructure = (fundId: string) => (
  filters: ComposeFiltersAllType
) => {
  return fundStructureAction(fundId);
};

export const getProfitChart = ({ id, period, currencies }: TGetChartArgs) => (
  dispatch: Dispatch
) => dispatch(fetchFundProfitChartAction(id, period, currencies));

export const getBalanceChart = ({ id, period, currencies }: TGetChartArgs) => (
  dispatch: Dispatch
) => {
  dispatch(fetchFundBalanceChartAction(id, period, currencies[0]));
};

interface TGetChartArgs {
  currencies: CurrencyEnum[];
  id: string;
  period?: ChartDefaultPeriod;
}
