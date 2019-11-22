import {
  AttachToExternalSignalProviderExt,
  AttachToSignalProvider,
  BrokerTradeServerType,
  CancelablePromise,
  NewExternalTradingAccountRequest,
  NewTradingAccountRequest,
  TradingAccountDetails
} from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import brokersApi from "services/api-client/brokers-api";
import signalApi from "services/api-client/signal-api";
import authService from "shared/services/auth-service";

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
  Promise.resolve(100) as CancelablePromise<number>;

export const attachToExternalSignal: TSignalRequest = async ({
  id,
  requestParams
}) => {
  const auth = authService.getAuthArg();
  const externalKeyId = requestParams.externalKeyId
    ? requestParams.externalKeyId
    : await assetsApi
        .createExternalTradingAccount(auth, { request: requestParams })
        .then(({ id }) => id);

  return signalApi.attachSlaveToMasterExternalPrivateAccount(
    id,
    authService.getAuthArg(),
    {
      model: { ...requestParams, externalKeyId }
    }
  );
};

export const attachToSignal: TSignalRequest = async ({
  id,
  requestParams,
  brokerType
}) => {
  const auth = authService.getAuthArg();
  const tradingAccountId = requestParams.tradingAccountId
    ? requestParams.tradingAccountId
    : await brokersApi
        .getBrokersExternal()
        .then(({ brokers }) => {
          const broker = brokers.find(({ name }) => name === brokerType)!;
          const leverage = broker.leverageMax;
          return assetsApi.createTradingAccount(auth, {
            request: { ...requestParams, leverage }
          });
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
  brokerType?: BrokerTradeServerType;
}) => Promise<any>;
