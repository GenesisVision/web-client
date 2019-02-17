import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import signalApi from "shared/services/api-client/signal-api";
import { IRequestParams } from "../follow-popup/follow-popup-form";
import { CopyTradingAccountsList, WalletsInfo } from "gv-api-web";

export const getWalletsAddresses = (): Promise<WalletsInfo> =>
  walletApi.v10WalletAddressesGet(authService.getAuthArg());

export const getSignalAccounts = (): Promise<CopyTradingAccountsList> =>
  signalApi.v10SignalAccountsGet(authService.getAuthArg());

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
  programId: string,
  requestParams: IRequestParams
) =>
  signalApi.v10SignalUpdatePost(
    programId,
    authService.getAuthArg(),
    requestParams
  );
