import {
  AssetInvestmentRequest,
  DashboardAsset,
  DashboardChartAsset,
  DashboardInvestingDetails,
  DashboardSummary,
  DashboardTimeframeProfit,
  DashboardTradingDetails,
  FollowDetailsList,
  InvestmentEventViewModel,
  ItemsViewModelFollowDetailsList,
  MoneyLocation
} from "gv-api-web";
import { ASSET } from "shared/constants/constants";
import { CurrencyEnum } from "utils/types";

export type TDashboardRequest = AssetInvestmentRequest;
export type TDashboardInRequests = TDashboardRequest[];

export type TChartAsset = DashboardChartAsset;

export type TDashboardTotal = DashboardSummary;

export type TDashboardTotalField = DashboardTimeframeProfit;

export interface TDashboardStatistic {
  total: TDashboardTotal;
  events: TDashboardEvent[];
}

export type TDashboardTradingStatistic = DashboardTradingDetails;

export type TDashboardInvestingStatistic = DashboardInvestingDetails;

export type TDashboardEvent = InvestmentEventViewModel;

export interface TAsset {
  login?: string;
  broker?: string;
  type: ASSET;
  currency: CurrencyEnum;
  id: string;
  url: string;
  title: string;
  levelProgress?: number;
  logo: string;
  level?: number;
  color: string;
  manager: { url: string; username: string };
  statistic: {
    ddown: number;
    age: number;
    leverage: number;
    profit: number;
    profitPercent: number;
    balance: {
      currency: CurrencyEnum;
      amount: number;
    };
  };

  value: number;
  chart: any;
}
export type TDashboardRecommendations = ItemsViewModelFollowDetailsList;
export type TRecommendation = FollowDetailsList;

export type TDashboardPortfolio = Array<MoneyLocation>;

export type TAssets = Array<DashboardAsset>;

export interface TTradingTotal {
  total: number;
  equity: number;
  AUM: number;
}

export interface TTrading {
  total: TTradingTotal;
  public: TAsset[];
  personal: TAsset[];
  followThem: TAsset[];
}
