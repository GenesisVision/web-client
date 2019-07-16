import {
  AttachToSignalProvider,
  AttachToSignalProviderInfo,
  CopyTradingAccountsList,
  WalletsInfo
} from "gv-api-web";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

export const getWalletsAddresses = (): Promise<WalletsInfo> =>
  walletApi.v10WalletAddressesGet(authService.getAuthArg());

export const getSignalAccounts = (): Promise<CopyTradingAccountsList> =>
  signalApi.v10SignalAccountsGet(authService.getAuthArg());

export const getSignalInfo = (
  id: string
): Promise<AttachToSignalProviderInfo> =>
  signalApi.v10SignalAttachByIdInfoGet(id, authService.getAuthArg());

export const attachToSignal = (
  programId: string,
  requestParams: AttachToSignalProvider
) =>
  signalApi.v10SignalAttachByIdPost(programId, authService.getAuthArg(), {
    model: requestParams
  });

export const updateAttachToSignal = (
  id: string,
  requestParams: AttachToSignalProvider
) => {
  const params = {
    ...requestParams
  };
  return signalApi.v10SignalByIdUpdatePost(id, authService.getAuthArg(), {
    model: params
  });
};
