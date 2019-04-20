import { CopyTradingAccountInfo, InternalTransferRequest, WalletData } from "gv-api-web";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { formatCurrencyValue } from "shared/utils/formatter";

import {
  ItemsType,
  TransferFormValuesType
} from "../components/wallet-transfer-form";

export const walletTransferRequest = (
  data: TransferFormValuesType
): Promise<any> => {
  const {
    amount,
    sourceId,
    destinationId,
    transferAll,
    sourceType,
    destinationType
  } = data;
  return walletApi.v10WalletTransferPost(authService.getAuthArg(), {
    request: {
      amount: Number(amount),
      sourceId,
      destinationId,
      transferAll,
      sourceType,
      destinationType
    } as InternalTransferRequest
  });
};

export const getTransferAll = (
  values: { amount: string; sourceId: string },
  sourceItems: ItemsType
): boolean => {
  const { amount, sourceId } = values;
  const selectedSourceItem = getSelectedItem(sourceItems, sourceId);
  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedSourceItem.available,
    selectedSourceItem.currency
  );
  return amount === formattedAvailableSourceItem;
};

export const getDestinationItems: getDestinationWalletsType<
  CopyTradingAccountInfo | WalletData
  > = (wallets, sourceId) => wallets.filter(wallet => wallet.id !== sourceId);

export type getDestinationWalletsType<T> = (
  wallets: T[],
  sourceId: string
) => T[];

export const getSelectedItem: getSelectedWalletType<
  CopyTradingAccountInfo | WalletData
  > = (wallets, currentItemId) =>
  wallets.find(wallet => wallet.id === currentItemId)!;

export type getSelectedWalletType<T> = (wallets: T[], sourceId: string) => T;
