import { CopyTradingAccountInfo, WalletData } from "gv-api-web";

export type ItemsType = Array<ItemType>;
export type ItemType = CopyTradingAccountInfo | WalletData;

export enum TRANSFER_DIRECTION {
  WALLET = "Wallet",
  COPYTRADING_ACCOUNT = "CopyTradingAccount"
}

export enum TRANSFER_CONTAINER {
  SOURCE = "SOURCE",
  DESTINATION = "DESTINATION"
}
