import { CurrencySourceSelectItemType } from "components/currency-source-select/currency-source-select";
import { ItemsType } from "components/wallet-select/wallet-select";

export enum TRANSFER_DIRECTION {
  WALLET = "Wallet",
  COPYTRADING_ACCOUNT = "CopyTradingAccount"
}

export enum TRANSFER_CONTAINER {
  SOURCE = "SOURCE",
  DESTINATION = "DESTINATION"
}

export interface TransferItemType extends CurrencySourceSelectItemType {
  available: number;
}

export type TransferFormItemsType = {
  sourceItems: ItemsType;
  destinationItems: ItemsType;
};
