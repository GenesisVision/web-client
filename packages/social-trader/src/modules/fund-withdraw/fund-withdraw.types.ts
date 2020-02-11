import { Currency, FundWithdrawInfo, WalletBaseData } from "gv-api-web";

export type FundWithdrawInfoResponse = {
  withdrawInfo: FundWithdrawInfo;
  wallets: WalletBaseData[];
};

export type FundWithdraw = {
  percent: number;
  currency: Currency;
};

export enum FUND_WITHDRAW_FIELDS {
  walletId = "walletId",
  percent = "percent"
}

export interface FundWithDrawFormValues {
  [FUND_WITHDRAW_FIELDS.percent]: number;
  [FUND_WITHDRAW_FIELDS.walletId]: string;
}
