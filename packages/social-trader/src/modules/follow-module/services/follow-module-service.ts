import {
  AttachToExternalSignalProviderExt,
  AttachToSignalProvider,
  CancelablePromise,
  NewExternalTradingAccountRequest,
  NewTradingAccountRequest,
  TradingAccountDetails
} from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import signalApi from "services/api-client/signal-api";
import authService from "services/auth-service";

export const fetchExternalAccounts = ({
  id
}: {
  id: string;
}): CancelablePromise<TradingAccountDetails[]> =>
  signalApi
    .getSubscriberAccountsForAsset(id, authService.getAuthArg())
    .then(({ items }) => items);

export const fetchAccounts = ({
  id
}: {
  id: string;
}): CancelablePromise<TradingAccountDetails[]> =>
  signalApi
    .getSubscriberAccountsForAsset(id, authService.getAuthArg())
    .then(({ items }) => items);

export const getSignalInfo = (id: string): CancelablePromise<number> =>
  (Promise.resolve(100) as unknown) as CancelablePromise<number>;

export const attachToExternalSignal: TSignalRequest = async ({
  id,
  requestParams
}) => {
  const auth = authService.getAuthArg();
  const tradingAccountId = requestParams.tradingAccountId
    ? requestParams.tradingAccountId
    : await assetsApi
        .createExternalTradingAccount(auth, { request: requestParams })
        .then(({ id }) => id);

  return signalApi.attachSlaveToMasterExternalPrivateAccount(
    id,
    authService.getAuthArg(),
    {
      model: { ...requestParams, tradingAccountId }
    }
  );
};

export const attachToSignal: TSignalRequest = async ({
  id,
  requestParams,
  leverage
}) => {
  const auth = authService.getAuthArg();
  const tradingAccountId = requestParams.tradingAccountId
    ? requestParams.tradingAccountId
    : await assetsApi
        .createTradingAccount(auth, {
          request: { ...requestParams, leverage }
        })
        .then(({ id }) => id);

  return signalApi.attachSlaveToMasterInternal(id, authService.getAuthArg(), {
    model: { ...requestParams, tradingAccountId }
  });
};

export const updateAttachToSignal: TSignalRequest = ({ id, requestParams }) =>
  signalApi.updateSubscriptionSettings(id, authService.getAuthArg(), {
    model: requestParams
  });

export type TSignalRequest = (args: {
  id: string;
  requestParams: AttachToSignalProvider &
    AttachToExternalSignalProviderExt &
    NewTradingAccountRequest &
    NewExternalTradingAccountRequest;
  leverage: number;
}) => CancelablePromise<any>;
