import { SignalSubscription } from "gv-api-web";
import followApi from "services/api-client/follow-api";
import authService from "services/auth-service";

export const fetchSubscriptions = (id: string) =>
  followApi
    .getFollowSubscriptionsForAsset(id, authService.getAuthArg())
    .then(({ items }) => items);

export const fetchSubscriptionsCount = (id: string) =>
  followApi
    .getFollowSubscriptionsForAsset(id, authService.getAuthArg())
    .then(({ total }) => total);

export const SignalSubscriptionLoaderData: SignalSubscription = {
  subscriberInfo: { tradingAccountId: "", tradingAccountLogin: "" },
  asset: {
    id: "",
    logo: "",
    color: "",
    title: "",
    url: "",
    assetType: "None",
    programDetails: { level: 0, levelProgress: 0 }
  },
  hasSignalAccount: false,
  hasActiveSubscription: false,
  mode: "ByBalance",
  percent: 0,
  openTolerancePercent: 0,
  fixedVolume: 0,
  fixedCurrency: "GVT",
  totalProfit: 0,
  totalVolume: 0
};
