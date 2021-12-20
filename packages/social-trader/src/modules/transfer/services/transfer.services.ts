import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import {
  InternalMultiTransferRequest,
  InternalTransferRequest
} from "gv-api-web";
import { api } from "services/api-client/swagger-custom-client";
import { formatCurrencyValue } from "utils/formatter";

export const transferRequest = (body: InternalTransferRequest): Promise<any> =>
  api.wallet().transfer({
    body
  });

export const transferMultiCurrencyRequest = (
  body: InternalMultiTransferRequest
): Promise<any> =>
  api.wallet().transferMultiCurrency({
    body
  });

export const getTransferAll = (
  values: { amount: number; sourceId: string },
  sourceItems: ItemsType
): boolean => {
  const { amount, sourceId } = values;
  const selectedSourceItem = getItem(sourceItems, sourceId);
  const formattedAvailableSourceItem = formatCurrencyValue(
    selectedSourceItem.available,
    selectedSourceItem.currency
  );
  return String(amount) === formattedAvailableSourceItem;
};

export type getItemsType<T> = (items: T[], sourceId: string) => T[];
export const getOtherItems: getItemsType<WalletItemType> = (items, sourceId) =>
  items.filter(({ id }) => id !== sourceId);

export type getItemType<T> = (items: T[], sourceId: string) => T;
export const getItem: getItemType<WalletItemType> = (items, currentItemId) =>
  items.find(({ id }) => id === currentItemId) || items[0];
