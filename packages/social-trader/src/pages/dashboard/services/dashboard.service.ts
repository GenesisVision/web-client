import { ComposeFiltersAllType } from "components/table/components/filtering/filter.type";
import { IDataModel } from "constants/constants";
import {
  DashboardTradingAsset,
  DashboardTradingAssetItemsViewModel,
  FollowDetailsListItem,
  FundInvestingDetailsListItemsViewModel,
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
import { api } from "services/api-client/swagger-custom-client";
import { getDefaultDateRange } from "utils/dates";
import { CurrencyEnum } from "utils/types";

export const getInvestingFunds = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  api.dashboard().getInvestingFunds({
    ...filters,
    ...getDefaultDateRange()
  });

export const getInvestingPrograms = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  api.dashboard().getInvestingPrograms({
    ...filters,
    ...getDefaultDateRange()
  });

export const getInvestingMostProfitable = (
  filters?: ComposeFiltersAllType
): Promise<IDataModel> =>
  api.dashboard().getMostProfitableAssets({
    ...filters,
    ...getDefaultDateRange()
  });

export const fetchRequests = (take: number = 100) =>
  api.investments().getRequests(0, take);

export const getRequestsCount = () =>
  fetchRequests(0).then(({ total }) => total);

export const fetchInRequests = (): Promise<TDashboardInRequests> =>
  fetchRequests().then(({ items }) => items);

export const getFollowThem = () => fetchFollows({ facetId: "Top" });

export const getPrivateAssets = (
  filters?: ComposeFiltersAllType
): Promise<DashboardTradingAssetItemsViewModel> =>
  api.dashboard().getPrivateTradingAssets({
    ...filters,
    ...getDefaultDateRange()
  });

export const getSelfManagedFunds = (
  filters?: ComposeFiltersAllType
): Promise<FundInvestingDetailsListItemsViewModel> =>
  Promise.resolve({ items: [], total: 0 });

export const getPublicAssets = (
  filters?: ComposeFiltersAllType
): Promise<DashboardTradingAssetItemsViewModel> =>
  api.dashboard().getPublicTradingAssets({
    ...filters,
    ...getDefaultDateRange()
  });

export const getPortfolio = (): Promise<TDashboardPortfolio> =>
  api
    .dashboard()
    .getPortfolio()
    .then(({ distribution }) => distribution);

export const getAssetsPercents = (): Promise<TAssets> =>
  api
    .dashboard()
    .getHoldings()
    .then(({ assets }) => assets);

export const getRecommendations = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<FollowDetailsListItem[]> =>
  api
    .dashboard()
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
  api.dashboard().getDashboardSummary({ currency });

export const fetchTradingTotalStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardTradingStatistic> =>
  api.dashboard().getTradingDetails({
    currency,
    eventsTake: 4
  });

export const getTotalInvestingStatistic = ({
  currency
}: {
  currency: CurrencyEnum;
}): Promise<TDashboardInvestingStatistic> =>
  api.dashboard().getInvestingDetails({
    currency,
    eventsTake: 4
  });

export const fetchInvestmentHistory = (filters?: ComposeFiltersAllType) =>
  api
    .events()
    .getEvents({
      ...filters,
      eventGroup: "InvestmentHistory",
      eventLocation: "Dashboard"
    })
    .then(({ events, total }) => ({ items: events, total }));

export const fetchTradingHistory = (filters?: ComposeFiltersAllType) =>
  api
    .events()
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
  logoUrl: "",
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
  logoUrl: "",
  currency: currency || "ETH",
  available: balance || 0
});
