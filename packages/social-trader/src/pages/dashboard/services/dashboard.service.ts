import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import {
  DashboardTradingAsset,
  DashboardTradingAssetItemsViewModel,
  FollowDetailsListItem,
  PrivateTradingAccountFull,
  ProgramFollowDetailsFull
} from "gv-api-web";
import { fetchFollows } from "modules/follows-table/services/follows-table.service";
import { TransferItemType } from "modules/transfer/transfer.types";
import {
  TAssets,
  TDashboardInRequests,
  TDashboardInvestingStatistic,
  TDashboardPortfolio,
  TDashboardTotal,
  TDashboardTradingStatistic
} from "pages/dashboard/dashboard.types";
import dashboardApi from "services/api-client/dashboard-api";
import eventsApi from "services/api-client/events-api";
import investmentsApi from "services/api-client/investments-api";
import { api, Token } from "services/api-client/swagger-custom-client";
// import authService from "services/auth-service";
import { getDefaultDateRange } from "utils/dates";
import { CurrencyEnum } from "utils/types";

const token = Token.create();

export const getInvestingFunds = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  api.dashboard(token).getInvestingFunds({
    ...filters,
    ...getDefaultDateRange()
  });

export const getInvestingPrograms = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  api.dashboard(token).getInvestingPrograms({
    ...filters,
    ...getDefaultDateRange()
  });

export const getInvestingMostProfitable = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  api.dashboard(token).getMostProfitableAssets({
    ...filters,
    ...getDefaultDateRange()
  });

export const fetchRequests = (take: number = 100) =>
  api.investments(token).getRequests(0, take);

export const getRequestsCount = () =>
  fetchRequests(0).then(({ total }) => total);

export const fetchInRequests = (): Promise<TDashboardInRequests> =>
  fetchRequests().then(({ items }) => items);

export const getFollowThem = () => fetchFollows({ facetId: "Top" });

export const getPrivateAssets = (
  filters?: ComposeFiltersAllType
): Promise<DashboardTradingAssetItemsViewModel> =>
  api.dashboard(token).getPrivateTradingAssets({
    ...filters,
    ...getDefaultDateRange()
  });

export const getPublicAssets = (
  filters?: ComposeFiltersAllType
): Promise<DashboardTradingAssetItemsViewModel> =>
  api.dashboard(token).getPublicTradingAssets({
    ...filters,
    ...getDefaultDateRange()
  });

export const getPortfolio = (): Promise<TDashboardPortfolio> =>
  api
    .dashboard(token)
    .getPortfolio()
    .then(({ distribution }) => distribution);

export const getAssetsPercents = (): Promise<TAssets> =>
  api
    .dashboard(token)
    .getHoldings()
    .then(({ assets }) => assets);

export const getRecommendations = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<FollowDetailsListItem[]> =>
  api
    .dashboard(token)
    .getRecommendations({
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
  api.dashboard(token).getDashboardSummary({ currency });

export const fetchTradingTotalStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardTradingStatistic> =>
  api.dashboard(token).getTradingDetails({
    currency,
    eventsTake: 4
  });

export const getTotalInvestingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardInvestingStatistic> =>
  api.dashboard(token).getInvestingDetails({
    currency,
    eventsTake: 4
  });

export const fetchInvestmentHistory = (filters?: ComposeFiltersAllType) =>
  eventsApi
    .getEvents({
      ...filters,
      eventGroup: "InvestmentHistory",
      eventLocation: "Dashboard"
    })
    .then(({ events, total }) => ({ items: events, total }));

export const fetchTradingHistory = (filters?: ComposeFiltersAllType) =>
  eventsApi
    .getEvents({
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
