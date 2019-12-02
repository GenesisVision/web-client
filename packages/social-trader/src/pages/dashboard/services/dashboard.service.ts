import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
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
  TDashboardInRequests,
  TDashboardInvestingStatistic,
  TDashboardPortfolio,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TTrading
} from "pages/dashboard/dashboard.types";
import { EVENT_LOCATION } from "pages/programs/program-details/service/program-details.service";
import { Dispatch } from "redux";
import dashboardApi from "services/api-client/dashboard-api";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";
import { IDataModel } from "shared/constants/constants";
import { ActionType, CurrencyEnum } from "utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";

export const fetchInRequests = (): CancelablePromise<TDashboardInRequests> =>
  investmentsApi
    .getRequests(0, 10, authService.getAuthArg())
    .then(({ items }) => items);

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

export const getAssets = (ctx?: NextPageContext) => async (
  dispatch: Dispatch
) => await dispatch(actions.fetchAssetsAction(authService.getAuthArg(ctx)));
