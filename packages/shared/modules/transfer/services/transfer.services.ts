import { InternalTransferRequest } from "gv-api-web";
import {
  ItemsType,
  ItemType
} from "shared/components/wallet-select/wallet-select";
import walletApi from "shared/services/api-client/wallet-api";
import authService from "shared/services/auth-service";
import { formatCurrencyValue } from "shared/utils/formatter";

import { TransferFormValues } from "../components/transfer-form";

export const transferRequest = (
  request: Pick<TransferFormValues, keyof InternalTransferRequest>
): Promise<any> =>
  walletApi.transfer(authService.getAuthArg(), {
    request: request as InternalTransferRequest
  });

export const getTransferAll = (
  values: { amount: number; sourceId: string },
  sourceItems: ItemsType
): boolean => {
  const { amount, sourceId } = values;
  const selectedSourceItem = getSelectedItem(sourceItems, sourceId);
  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedSourceItem.available,
    selectedSourceItem.currency
  );
  return String(amount) === formattedAvailableSourceItem;
};

export type getDestinationItemsType<T> = (items: T[], sourceId: string) => T[];
export const getDestinationItems: getDestinationItemsType<ItemType> = (
  items,
  sourceId
) => items.filter(item => item.id !== sourceId);

export type getSelectedItemType<T> = (items: T[], sourceId: string) => T;
export const getSelectedItem: getSelectedItemType<ItemType> = (
  items,
  currentItemId
) => items.find(item => item.id === currentItemId)!;
