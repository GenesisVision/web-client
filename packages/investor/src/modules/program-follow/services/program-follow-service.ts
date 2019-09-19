import {
  AttachToSignalProvider,
  AttachToSignalProviderInfo,
  CopyTradingAccountsList,
  WalletsInfo
} from "gv-api-web";
import { rateApi } from "shared/services/api-client/rate-api";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getWalletsAddresses = (): Promise<WalletsInfo> =>
  walletApi.v10WalletAddressesGet(authService.getAuthArg());

export const getSignalAccounts = (): Promise<CopyTradingAccountsList> =>
  signalApi.v10SignalAccountsGet(authService.getAuthArg());

export const getSignalInfo = (id: string): Promise<number> =>
  signalApi
    .v10SignalAttachByIdInfoGet(id, authService.getAuthArg())
    .then(({ minDeposit }) => minDeposit);

export const attachToSignal: TAttachToSignal = (id, requestParams) =>
  signalApi.v10SignalAttachByIdPost(id, authService.getAuthArg(), {
    model: requestParams
  });

export const updateAttachToSignal: TAttachToSignal = (id, requestParams) =>
  signalApi.v10SignalByIdUpdatePost(id, authService.getAuthArg(), {
    model: requestParams
  });

export const getRate = ({ from, to }: { from: string; to: string }) =>
  rateApi.v10RateByFromByToGet(from, to);

export type TAttachToSignal = (
  id: string,
  requestParams: AttachToSignalProvider
) => Promise<any>;
