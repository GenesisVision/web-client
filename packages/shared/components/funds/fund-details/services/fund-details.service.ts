import { FundAssetsListInfo, ReallocationsViewModel } from "gv-api-web";
import { NextPageContext } from "next";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import { HistoryCountsType } from "shared/components/programs/program-details/program-details.types";
import { fetchPortfolioEvents } from "shared/components/programs/program-details/services/program-details.service";
import { FilteringType } from "shared/components/table/components/filtering/filter.type";
import fundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, TGetState } from "shared/utils/types";

import {
  fetchFundBalanceChartAction,
  fetchFundDescriptionAction,
  fetchFundProfitChartAction,
  setFundIdAction
} from "../actions/fund-details.actions";

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

export const fetchFundReallocateHistory = (
  fundId: string,
  filters?: FilteringType
): Promise<ReallocationsViewModel> => {
  return fundsApi.v10FundsByIdReallocationsGet(fundId, filters);
};

export const closeFund = (
  id: string,
  opts: {
    twoFactorCode: string;
  }
): Promise<void> => {
  const authorization = authService.getAuthArg();

  return managerApi.v10ManagerFundsByIdClosePost(id, authorization, opts);
};

export const fetchEventsCounts = (id: string): Promise<HistoryCountsType> => {
  const isAuthenticated = authService.isAuthenticated();
  const filtering = { take: 0 };
  const eventsCountPromise = isAuthenticated
    ? fetchPortfolioEvents({ ...filtering, assetId: id })
    : Promise.resolve({ total: 0 });
  const reallocateCountPromise = fetchFundReallocateHistory(id, filtering);
  return Promise.all([eventsCountPromise, reallocateCountPromise]).then(
    ([eventsData, reallocateData]) => ({
      eventsCount: eventsData.total,
      reallocateCount: reallocateData.total
    })
  );
};

export const getProfitChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => dispatch(fetchFundProfitChartAction(id, period));

export const getBalanceChart = ({ id, period }: TGetChartArgs) => (
  dispatch: Dispatch
) => {
  dispatch(fetchFundBalanceChartAction(id, period));
};

type TGetChartArgs = {
  id: string;
  period?: ChartDefaultPeriod;
};
