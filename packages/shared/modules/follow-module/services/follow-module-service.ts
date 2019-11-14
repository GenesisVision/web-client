import {
  AttachToSignalProvider,
  CancelablePromise,
  DashboardTradingAsset,
  TradingAccountDetails
} from "gv-api-web";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

import dashboardApi from "../../../services/api-client/dashboard-api";

export const fetchAccounts = (
  id: string
): CancelablePromise<TradingAccountDetails[]> =>
  signalApi
    .getSubscriberAccountsForAsset(id, authService.getAuthArg())
    .then(({ items }) => items);

export const getSignalInfo = (id: string): CancelablePromise<number> =>
  Promise.resolve(100) as CancelablePromise<number>;

export const attachToSignal: TAttachToSignal = (id, requestParams) =>
  signalApi.attachSlaveToMaster(id, authService.getAuthArg(), {
    model: requestParams
  });

export const updateAttachToSignal: TAttachToSignal = (id, requestParams) =>
  signalApi.updateSubscriptionSettings(id, authService.getAuthArg(), {
    model: requestParams
  });

export type TAttachToSignal = (
  id: string,
  requestParams: AttachToSignalProvider
) => CancelablePromise<any>;
