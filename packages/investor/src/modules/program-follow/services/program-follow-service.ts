import {
  AttachToSignalProviderInfo,
  CancelablePromise,
  CopyTradingAccountsList,
  WalletsInfo
} from "gv-api-web";
import signalApi from "shared/services/api-client/signal-api";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";

import { IRequestParams } from "../follow-popup/follow-popup-form";

export const getWalletsAddresses = (): CancelablePromise<WalletsInfo> =>
  walletApi.v10WalletAddressesGet(authService.getAuthArg());

export const getSignalAccounts = (): CancelablePromise<
  CopyTradingAccountsList
> => signalApi.v10SignalAccountsGet(authService.getAuthArg());

export const getSignalInfo = (
  id: string
): CancelablePromise<AttachToSignalProviderInfo> =>
  signalApi.v10SignalAttachByIdInfoGet(id, authService.getAuthArg());

export const attachToSignal = (
  programId: string,
  requestParams: IRequestParams
) =>
  signalApi.v10SignalAttachByIdPost(
    programId,
    authService.getAuthArg(),
    requestParams
  );

export const updateAttachToSignal = (
  id: string,
  requestParams: IRequestParams
) => {
  const params = {
    ...requestParams
  };
  return signalApi.v10SignalByIdUpdatePost(
    id,
    authService.getAuthArg(),
    params
  );
};
