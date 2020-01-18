import { ChartDefaultPeriod } from "components/chart/chart-period/chart-period.helpers";
import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import {
  DashboardAssetChart,
  DashboardChartAsset,
  DashboardTradingAsset,
  FollowDetailsListItem,
  InvestmentEventViewModels,
  ItemsViewModelDashboardTradingAsset,
  PrivateTradingAccountFull,
  ProgramFollowDetailsFull
} from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import { TransferItemType } from "modules/transfer/transfer.types";
import { NextPageContext } from "next";
import { getTradingLoaderData } from "pages/dashboard/dashboard.loaders-data";
import {
  TAssets,
  TDashboardInRequests,
  TDashboardInvestingStatistic,
  TDashboardPortfolio,
  TDashboardTotal,
  TDashboardTradingStatistic,
  TTrading
} from "pages/dashboard/dashboard.types";
import { EVENT_LOCATION } from "pages/invest/programs/program-details/service/program-details.service";
import { Dispatch } from "redux";
import dashboardApi from "services/api-client/dashboard-api";
import eventsApi from "services/api-client/events-api";
import investmentsApi from "services/api-client/investments-api";
import authService from "services/auth-service";
import { ActionType, CurrencyEnum } from "utils/types";

import * as actions from "../actions/dashboard.actions";
import { fetchEventsAction } from "../actions/dashboard.actions";

export const getInvestingFunds = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  dashboardApi.getInvestingFunds(authService.getAuthArg(), filters);

export const getInvestingPrograms = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  dashboardApi.getInvestingPrograms(authService.getAuthArg(), filters);

export const getInvestingMostProfitable = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  dashboardApi.getMostProfitableAssets(authService.getAuthArg(), filters);

export const fetchRequests = (take: number = 100) =>
  investmentsApi.getRequests(0, take, authService.getAuthArg());

export const getRequestsCount = () =>
  fetchRequests(0).then(({ total }) => total);

export const fetchInRequests = (): Promise<TDashboardInRequests> =>
  fetchRequests().then(({ items }) => items);

export const fetchMultiChartData = ({
  assets,
  period: { start, end },
  currency
}: {
  assets: string[];
  period: ChartDefaultPeriod;
  currency: CurrencyEnum;
}): Promise<DashboardAssetChart[]> =>
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
): Promise<DashboardChartAsset[]> =>
  dashboardApi
    .getChartAssets(authService.getAuthArg())
    .then(({ assets }) => assets);

export const getFollowThem = () => fetchFollows({ facetId: "Top" });

export const getPrivateAssets = (
  filters?: ComposeFiltersAllType
): Promise<ItemsViewModelDashboardTradingAsset> =>
  dashboardApi.getPrivateTradingAssets(authService.getAuthArg(), filters);

export const getPublicAssets = (
  filters?: ComposeFiltersAllType
): Promise<ItemsViewModelDashboardTradingAsset> =>
  dashboardApi.getPublicTradingAssets(authService.getAuthArg(), filters);

export const getTradingData = (): Promise<TTrading> =>
  (Promise.resolve(getTradingLoaderData()) as unknown) as Promise<TTrading>;

export const getPortfolio = (): Promise<TDashboardPortfolio> =>
  dashboardApi
    .getPortfolio(authService.getAuthArg())
    .then(({ distribution }) => distribution);

export const getAssetsPercents = (): Promise<TAssets> =>
  dashboardApi
    .getHoldings(authService.getAuthArg())
    .then(({ assets }) => assets);

export const getRecommendations = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<FollowDetailsListItem[]> =>
  dashboardApi
    .getRecommendations(authService.getAuthArg(), {
      onlyFollows: true,
      currency,
      take: 15
    })
    .then(({ follows }) => follows)
    .then(({ items }) => items);

export const getTotal = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardTotal> =>
  dashboardApi.getSummary(authService.getAuthArg(), { currency });

export const fetchTradingTotalStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardTradingStatistic> =>
  dashboardApi.getTradingDetails(authService.getAuthArg(), {
    currency,
    eventsTake: 4
  });

export const getTotalInvestingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardInvestingStatistic> =>
  dashboardApi.getInvestingDetails(authService.getAuthArg(), {
    currency,
    eventsTake: 4
  });

export const getEvents = (eventLocation: EVENT_LOCATION) => (
  filters: ComposeFiltersAllType
): ActionType<Promise<InvestmentEventViewModels>> =>
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

export const fetchInvestmentHistory = (filters?: ComposeFiltersAllType) =>
  eventsApi
    .getEvents(authService.getAuthArg(), {
      ...filters,
      eventGroup: "InvestmentHistory",
      eventLocation: "Dashboard"
    })
    .then(({ events, total }) => ({ items: events, total }));

export const fetchTradingHistory = (filters?: ComposeFiltersAllType) =>
  eventsApi
    .getEvents(authService.getAuthArg(), {
      ...filters,
      eventGroup: "TradingHistory",
      eventLocation: "Dashboard"
    })
    .then(({ events, total }) => ({ items: events, total }));

export const mapAccountToTransferItemType = ({
  id,
  accountInfo: { title, currency, balance }
}: DashboardTradingAsset): TransferItemType => ({
  id,
  title,
  logo: "",
  currency: currency || "ETH",
  available: balance || 0
});

export const mapProgramFollowToTransferItemType = ({
  id,
  publicInfo: { title },
  tradingAccountInfo: { currency, balance }
}: ProgramFollowDetailsFull | PrivateTradingAccountFull): TransferItemType => ({
  id,
  title,
  logo: "",
  currency: currency || "ETH",
  available: balance || 0
});

export const mapAccountFullToTransferItemType = ({
  id,
  publicInfo: { title },
  tradingAccountInfo: { currency, balance }
}: PrivateTradingAccountFull): TransferItemType => ({
  id,
  title,
  logo: "",
  currency: currency || "ETH",
  available: balance || 0
});
