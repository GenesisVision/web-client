import { Currency, FundWithdrawInfo, WalletBaseData } from "gv-api-web";

export type FundWithdrawalInfoResponse = {
  withdrawalInfo: FundWithdrawInfo;
  wallets: WalletBaseData[];
};

export type FundWithdraw = {
  percent: number;
  currency: Currency;
};
