import { SignalSubscription } from "gv-api-web";
import { getAccountSubscriptionLoaderData } from "pages/accounts/account-details/account-details.loader-data";
import { api, Token } from "services/api-client/swagger-custom-client";

export const fetchSubscriptions = (id: string) =>
  api
    .follows()
    .getFollowSubscriptionsForAsset(id)
    .then(({ items }) => items);

export const SignalSubscriptionLoaderData: SignalSubscription = getAccountSubscriptionLoaderData();
