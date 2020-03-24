import {
  AmountWithCurrency,
  AttachToExternalSignalProviderExt,
  AttachToSignalProvider,
  BrokerTradeServerType,
  NewExternalTradingAccountRequest,
  NewTradingAccountRequest,
  TradingAccountDetails,
  TradingAccountMinCreateAmount
} from "gv-api-web";
import assetsApi from "services/api-client/assets-api";
import signalApi from "services/api-client/signal-api";
import { CurrencyEnum } from "utils/types";

export const fetchExternalAccounts = ({
  id
}: {
  id: string;
}): Promise<TradingAccountDetails[]> =>
  signalApi.getSubscriberAccountsForAsset(id).then(({ items }) => items);

export const fetchAccounts = ({
  id
}: {
  id: string;
}): Promise<TradingAccountDetails[]> =>
  signalApi.getSubscriberAccountsForAsset(id).then(({ items }) => items);

export const attachToExternalSignal: TSignalRequest = async ({
  id,
  requestParams
}) => {
  const tradingAccountId = requestParams.tradingAccountId
    ? requestParams.tradingAccountId
    : await assetsApi
        .createExternalTradingAccount({ body: requestParams })
        .then(({ id }) => id);

  return signalApi.attachSlaveToMasterExternalPrivateAccount(id, {
    body: { ...requestParams, tradingAccountId }
  });
};

export const attachToSignal: TSignalRequest = async ({
  id,
  requestParams,
  leverage
}) => {
  const tradingAccountId = requestParams.tradingAccountId
    ? requestParams.tradingAccountId
    : await assetsApi
        .createTradingAccount({
          body: { ...requestParams, leverage }
        })
        .then(({ id }) => id);

  return signalApi.attachSlaveToMasterInternal(id, {
    body: { ...requestParams, tradingAccountId }
  });
};

export const updateAttachToSignal: TSignalRequest = ({ id, requestParams }) =>
  signalApi.updateSubscriptionSettings(id, {
    body: requestParams
  });

export const updateExternalAttachToSignal: TSignalRequest = ({
  id,
  requestParams
}) =>
  signalApi.updateExternalSubscriptionSettings(id, {
    body: requestParams
  });

export type TSignalRequest = (args: {
  id: string;
  requestParams: AttachToSignalProvider &
    AttachToExternalSignalProviderExt &
    NewTradingAccountRequest &
    NewExternalTradingAccountRequest;
  leverage: number;
}) => Promise<any>;

export const getUpdateAttachMethod = (isExternal: boolean) =>
  isExternal ? updateExternalAttachToSignal : updateAttachToSignal;

export const getMinDeposit = ({
  isExternal,
  tradingAccountMinDepositAmounts,
  broker,
  currency
}: {
  isExternal: boolean;
  broker: BrokerTradeServerType;
  tradingAccountMinDepositAmounts: TradingAccountMinCreateAmount[];
  currency?: CurrencyEnum;
}): number => {
  const brokerDepositAmounts = tradingAccountMinDepositAmounts.find(
    ({ serverType }) => serverType === broker
  );
  if (isExternal || !brokerDepositAmounts) return 0;
  const depositAmountInCurr = brokerDepositAmounts.minDepositCreateAsset.find(
    (minDeposit: AmountWithCurrency) => minDeposit.currency === currency
  );
  return depositAmountInCurr ? depositAmountInCurr.amount : 0;
};
