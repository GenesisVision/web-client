import { CancelablePromise, InvestmentEventViewModels } from "gv-api-web";
import { NextPageContext } from "next";
import { ManagerRootState } from "reducers";
import { Dispatch } from "redux";
import { ChartDefaultPeriod } from "shared/components/chart/chart-period/chart-period.helpers";
import dashboardFundsTableSelector from "shared/components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import { EVENT_LOCATION } from "shared/components/programs/program-details/services/program-details.service";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ComposeFiltersAllType } from "shared/components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "shared/components/table/services/table.service";
import fundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import {
  ActionType,
  MiddlewareDispatch,
  TGetAuthState
} from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";
import { getDashboardFunds } from "./dashboard-funds.service";

export const getEvents = (eventLocation: EVENT_LOCATION) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(filters, eventLocation);

export const getPortfolioEvents = () => (dispatch: Dispatch) =>
  dispatch(
    actions.fetchPortfolioEventsAction(authService.getAuthArg(), {
      eventLocation: EVENT_LOCATION.Dashboard,
      take: 5
    })
  );

export const getAssetChart = (
  assetId: string,
  assetTitle: string,
  assetType: ASSETS_TYPES
) => (dispatch: Dispatch, getState: TGetAuthState) => {
  const { period } = getState().dashboard;
  const chartFilter = {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };

  if (assetType === ASSETS_TYPES.Program) {
    //TODO удалить if, отрефакторить
    programsApi
      .v10ProgramsByIdChartsProfitGet(assetId, chartFilter)
      .then(data => {
        dispatch(
          actions.dashboardChartAction({
            type: assetType,
            id: assetId,
            title: assetTitle,
            currency: data.programCurrency,
            pnLChart: data.pnLChart,
            equityChart: data.equityChart
          })
        );
      });
  } else {
    fundsApi.v10FundsByIdChartsProfitGet(assetId, chartFilter).then(data => {
      dispatch(
        actions.dashboardChartAction({
          type: assetType,
          id: assetId,
          title: assetTitle,
          equityChart: data.equityChart
        })
      );
    });
  }
};

export const getAssets = (ctx?: NextPageContext) => async (
  dispatch: Dispatch
) => await dispatch(actions.fetchAssetsAction(authService.getAuthArg(ctx)));

export const composeAssetChart = (assetType?: ASSETS_TYPES) => async (
  dispatch: MiddlewareDispatch,
  getState: TGetAuthState
) => {
  const { programs, funds } = getState().dashboard.assets.data;
  let asset;
  if (assetType === ASSETS_TYPES.Program) {
    asset = programs[0];
  } else if (assetType === ASSETS_TYPES.Fund) {
    asset = funds[0];
  } else return;

  await dispatch(getAssetChart(asset.id, asset.title, assetType));
};

export const setPeriod = (period: ChartDefaultPeriod) => (dispatch: Dispatch) =>
  dispatch(actions.setPeriodAction(period));

export const getAssetsCount = (): Promise<{
  programsCount: number;
  fundsCount: number;
}> => {
  const authorization = authService.getAuthArg();
  const filtering = { take: 0 };
  return Promise.all([
    managerApi.v10ManagerProgramsGet(authorization, filtering),
    managerApi.v10ManagerFundsGet(authorization, filtering)
  ]).then(([programsData, fundsData]) => ({
    programsCount: programsData.total,
    fundsCount: fundsData.total
  }));
};

export const getAssetsCounts = () => (
  dispatch: Dispatch,
  getState: () => ManagerRootState
) => {
  const commonFiltering = { take: 0 };

  const fundsCountFilters = composeRequestFiltersByTableState(
    dashboardFundsTableSelector(getState())
  );
  dispatch(getDashboardFunds({ ...fundsCountFilters, ...commonFiltering }));
};
