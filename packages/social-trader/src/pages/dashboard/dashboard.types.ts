import {
  AssetInvestmentRequest,
  DashboardAsset,
  DashboardInvestingDetails,
  DashboardSummary,
  DashboardTimeframeProfit,
  DashboardTradingDetails,
  FollowDetailsListItem,
  InvestmentEventViewModel,
  MoneyLocation
} from "gv-api-web";

export type TDashboardRequest = AssetInvestmentRequest;
export type TDashboardInRequests = TDashboardRequest[];

export type TDashboardTotal = DashboardSummary;

export type TDashboardTotalField = DashboardTimeframeProfit;

export type TDashboardTradingStatistic = DashboardTradingDetails;

export type TDashboardInvestingStatistic = DashboardInvestingDetails;

export type TDashboardEvent = InvestmentEventViewModel;

export type TDashboardRecommendations = FollowDetailsListItem[];
export type TRecommendation = FollowDetailsListItem;

export type TDashboardPortfolio = Array<MoneyLocation>;

export type TAssets = Array<DashboardAsset>;
