import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import signalApi from "shared/services/api-client/signal-api";
import { IRequestParams } from "../follow-popup/follow-popup-form";

export const getWalletsAddresses = () =>
  walletApi.v10WalletAddressesGet(authService.getAuthArg());

export const getSignalAccounts = () =>
  signalApi.v10SignalAccountsPost(authService.getAuthArg());

export const attachToSignal = (
  programId: string,
  requestParams: IRequestParams
) =>
  signalApi.v10SignalAttachByIdPost(
    programId,
    authService.getAuthArg(),
    requestParams
  );
