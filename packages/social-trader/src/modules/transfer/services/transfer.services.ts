import { ItemsType, ItemType } from "components/wallet-select/wallet-select";
import { CancelablePromise, InternalTransferRequest } from "gv-api-web";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { formatCurrencyValue } from "utils/formatter";

import { TransferFormValues } from "../components/transfer-form";

export const transferRequest = (
  request: Pick<TransferFormValues, keyof InternalTransferRequest>
): CancelablePromise<any> =>
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
