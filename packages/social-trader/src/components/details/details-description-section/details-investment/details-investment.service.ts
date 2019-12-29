import { SignalSubscription } from "gv-api-web";
import { getAccountSubscriptionLoaderData } from "pages/accounts/account-details/account-details.loader-data";
import followApi from "services/api-client/follow-api";
import authService from "services/auth-service";

export const fetchSubscriptions = (id: string) =>
  followApi
    .getFollowSubscriptionsForAsset(id, authService.getAuthArg())
    .then(({ items }) => items);

export const SignalSubscriptionLoaderData: SignalSubscription = getAccountSubscriptionLoaderData();
