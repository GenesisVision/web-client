import { InternalTransferRequest } from "gv-api-web";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { formatCurrencyValue } from "shared/utils/formatter";

import { TransferFormValuesType } from "../components/transfer-form";
import { ItemType, ItemsType } from "../transfer.types";

export const transferRequest = (data: TransferFormValuesType): Promise<any> => {
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

export const getDestinationItems: getDestinationWalletsType<ItemType> = (
  items,
  sourceId
) => items.filter(item => item.id !== sourceId);

export type getDestinationWalletsType<T> = (
  items: T[],
  sourceId: string
) => T[];

export const getSelectedItem: getSelectedWalletType<ItemType> = (
  items,
  currentItemId
) => items.find(item => item.id === currentItemId)!;

export type getSelectedWalletType<T> = (items: T[], sourceId: string) => T;
