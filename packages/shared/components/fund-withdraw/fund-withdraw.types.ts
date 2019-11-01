import { Currency, FundWithdrawInfoOld, WalletBaseData } from "gv-api-web";

export type FundWithdrawalInfoResponse = {
  withdrawalInfo: FundWithdrawInfoOld;
  wallets: WalletBaseData[];
};

export type FundWithdraw = {
  percent: number;
  currency: Currency;
};
