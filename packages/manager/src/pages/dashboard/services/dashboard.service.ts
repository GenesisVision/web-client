import { Dispatch } from "redux";
import { ASSETS_TYPES } from "shared/components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import fundsApi from "shared/services/api-client/funds-api";
import managerApi from "shared/services/api-client/manager-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { MiddlewareDispatch, TGetAuthState } from "shared/utils/types";

import * as actions from "../actions/dashboard.actions";

export const getPortfolioEvents = () => (dispatch: Dispatch) =>
  dispatch(actions.fetchPortfolioEvents(authService.getAuthArg(), { take: 5 }));

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
          actions.dashboardChart({
            type: assetType,
            id: assetId,
            title: assetTitle,
            currencyChart: data.programCurrency,
            pnLChart: data.pnLChart,
            equityChart: data.equityChart
          })
        );
      });
  } else {
    fundsApi.v10FundsByIdChartsProfitGet(assetId, chartFilter).then(data => {
      dispatch(
        actions.dashboardChart({
          type: assetType,
          id: assetId,
          title: assetTitle,
          equityChart: data.equityChart
        })
      );
    });
  }
};

export const getAssets = () => (dispatch: Dispatch) =>
  dispatch(actions.fetchAssets(authService.getAuthArg()));

export const composeAssetChart = () => (
  dispatch: MiddlewareDispatch,
  getState: TGetAuthState
) => {
  const { programs, funds } = getState().dashboard.assets.data;
  let asset, assetType;
  if (programs.length > 0) {
    asset = programs[0];
    assetType = ASSETS_TYPES.Program;
  } else if (funds.length > 0) {
    asset = funds[0];
    assetType = ASSETS_TYPES.Fund;
  } else return;

  dispatch(getAssetChart(asset.id, asset.title, assetType));
};

export const setPeriod = (period: any) => (dispatch: Dispatch) =>
  dispatch(actions.setPeriod(period));

export const fetchAssetsCount = (): Promise<{
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
