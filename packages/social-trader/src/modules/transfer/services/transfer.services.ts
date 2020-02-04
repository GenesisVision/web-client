import {
  ItemsType,
  WalletItemType
} from "components/wallet-select/wallet-select";
import { InternalTransferRequest } from "gv-api-web";
import { TransferFormValues } from "modules/transfer/components/transfer-form.helpers";
import walletApi from "services/api-client/wallet-api";
import authService from "services/auth-service";
import { formatCurrencyValue } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export const fetchTradingAccounts = (currency: CurrencyEnum) =>
  walletApi
    .getAccountsAvailable(currency, authService.getAuthArg())
    .then(({ wallets }) => wallets);

export const transferRequest = (
  request: Pick<TransferFormValues, keyof InternalTransferRequest>
): Promise<any> =>
  walletApi.transfer(authService.getAuthArg(), {
    body: request as InternalTransferRequest
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
