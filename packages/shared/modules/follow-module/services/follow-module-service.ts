import {
  AttachToSignalProvider,
  CancelablePromise,
  TradingAccountDetails
} from "gv-api-web";
import signalApi from "shared/services/api-client/signal-api";
import authService from "shared/services/auth-service";

export const fetchAccounts = ({
  id
}: {
  id: string;
}): CancelablePromise<TradingAccountDetails[]> =>
  signalApi
    .getSubscriberAccountsForAsset(id, authService.getAuthArg())
    .then(({ items }) => items);

export const getSignalInfo = (id: string): CancelablePromise<number> =>
  Promise.resolve(100) as CancelablePromise<number>;

export const attachToSignal: TSignalRequest = ({ id, requestParams }) =>
  signalApi.attachSlaveToMaster(id, authService.getAuthArg(), {
    model: requestParams
  });

export const updateAttachToSignal: TSignalRequest = ({ id, requestParams }) =>
  signalApi.updateSubscriptionSettings(id, authService.getAuthArg(), {
    model: requestParams
  });

export type TSignalRequest = (args: {
  id: string;
  requestParams: AttachToSignalProvider;
}) => CancelablePromise<any>;
