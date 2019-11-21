import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import dashboardFundsTableSelector from "components/dashboard/dashboard-assets/dashboard-funds/dashboard-funds.selector";
import { ASSETS_TYPES } from "components/table/components/filtering/asset-type-filter/asset-type-filter.constants";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { composeRequestFiltersByTableState } from "components/table/services/table.service";
import {
  CancelablePromise,
  DashboardAssetChart,
  DashboardChartAsset,
  DashboardRecommendations,
  InvestmentEventViewModels
} from "gv-api-web";
import { NextPageContext } from "next";
import {
  getTradingLoaderData,
  getTradingPublicLoaderData
} from "pages/dashboard/dashboard.loaders-data";
import {
  TAssets,
  TDashboardInvestingStatistic,
  TDashboardPortfolio,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TTrading
} from "pages/dashboard/dashboard.types";
import { EVENT_LOCATION } from "pages/programs/program-details/service/program-details.service";
import { AuthRootState } from "reducers";
import { Dispatch } from "redux";
import { IDataModel } from "shared/constants/constants";
import dashboardApi from "shared/services/api-client/dashboard-api";
import fundsApi from "shared/services/api-client/funds-api";
import programsApi from "shared/services/api-client/programs-api";
import authService from "shared/services/auth-service";
import { ActionType, CurrencyEnum } from "utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";
import { getDashboardFunds } from "./dashboard-funds.service";

export const fetchMultiChartData = ({
  assets,
  period: { start, end },
  currency
}: {
  assets: string[];
  period: ChartDefaultPeriod;
  currency: CurrencyEnum;
}): CancelablePromise<DashboardAssetChart[]> =>
  dashboardApi
    .getChart(authService.getAuthArg(), {
      showIn: currency,
      assets,
      dateFrom: start,
      dateTo: end
    })
    .then(({ charts }) => charts);

export const fetchAssets = (
  period: ChartDefaultPeriod
): CancelablePromise<DashboardChartAsset[]> =>
  dashboardApi
    .getChartAssets(authService.getAuthArg())
    .then(({ assets }) => assets);

export const getFollowThem = (): CancelablePromise<IDataModel> =>
  (Promise.resolve(
    getTradingPublicLoaderData()
  ) as unknown) as CancelablePromise<IDataModel>;

export const getPrivateAssets = (
  filters?: ComposeFiltersAllType
): CancelablePromise<IDataModel> =>
  dashboardApi.getPrivateTradingAssets(authService.getAuthArg(), filters);

export const getPublicAssets = (
  filters?: ComposeFiltersAllType
): CancelablePromise<IDataModel> =>
  dashboardApi.getPublicTradingAssets(authService.getAuthArg(), filters);

export const getTradingData = (): CancelablePromise<TTrading> =>
  (Promise.resolve(getTradingLoaderData()) as unknown) as CancelablePromise<
    TTrading
  >;

export const getPortfolio = (): CancelablePromise<TDashboardPortfolio> =>
  dashboardApi
    .getPortfolio(authService.getAuthArg())
    .then(({ distribution }) => distribution);

export const getAssetsPercents = (): CancelablePromise<TAssets> =>
  dashboardApi
    .getHoldings(authService.getAuthArg())
    .then(({ assets }) => assets);

export const getRecommendations = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<DashboardRecommendations> =>
  dashboardApi.getRecommendations(authService.getAuthArg(), { currency });

export const getTotal = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TDashboardTotal> =>
  dashboardApi.getSummary(authService.getAuthArg(), { currency });

export const getTotalTradingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TDashboardTradingStatistic> =>
  dashboardApi.getTradingDetails(authService.getAuthArg(), { currency });

export const getTotalInvestingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): CancelablePromise<TDashboardInvestingStatistic> =>
  dashboardApi.getInvestingDetails(authService.getAuthArg(), {
    currency
  });

export const getEvents = (eventLocation: EVENT_LOCATION) => (
  filters: ComposeFiltersAllType
): ActionType<CancelablePromise<InvestmentEventViewModels>> =>
  fetchEventsAction(filters, eventLocation);

export const getPortfolioEvents = (dispatch: Dispatch) =>
  dispatch(
    actions.fetchPortfolioEventsAction(authService.getAuthArg(), {
      eventLocation: EVENT_LOCATION.Dashboard,
      take: 5
    })
  );

export const getAssetChart = (
  assetId: string,
  assetTitle: string,
  assetType: ASSETS_TYPES,
  period: ChartDefaultPeriod
) => (dispatch: Dispatch) => {
  const chartFilter = {
    dateFrom: period.start,
    dateTo: period.end,
    maxPointCount: 100
  };

  if (assetType === ASSETS_TYPES.Program) {
    //TODO удалить if, отрефакторить
    programsApi
      .getProgramProfitPercentCharts(assetId, chartFilter)
      .then(data => {
        dispatch(
          actions.dashboardChartAction({
            type: assetType,
            id: assetId,
            title: assetTitle,
            currency: data.charts[0].currency,
            pnLChart: [],
            equityChart: data.charts
          })
        );
      });
  } else {
    fundsApi.getFundProfitPercentCharts(assetId, chartFilter).then(data => {
      dispatch(
        actions.dashboardChartAction({
          type: assetType,
          id: assetId,
          title: assetTitle,
          equityChart: data.charts
        })
      );
    });
  }
};

export const getAssets = (ctx?: NextPageContext) => async (
  dispatch: Dispatch
) => await dispatch(actions.fetchAssetsAction(authService.getAuthArg(ctx)));

export const setPeriod = (period: ChartDefaultPeriod) => (dispatch: Dispatch) =>
  dispatch(actions.setPeriodAction(period));

export const getAssetsCounts = () => (
  dispatch: Dispatch,
  getState: () => AuthRootState
) => {
  const commonFiltering = { take: 0 };

  const fundsCountFilters = composeRequestFiltersByTableState(
    dashboardFundsTableSelector(getState())
  );
  dispatch(getDashboardFunds({ ...fundsCountFilters, ...commonFiltering }));
};

export type TChartAsset = any; //ManagerSimpleProgram | ManagerSimpleFund;
