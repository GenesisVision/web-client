import { FundWithdrawInfo, WalletData } from "gv-api-web";

export type FundWithdrawalInfoResponse = {
  withdrawalInfo: FundWithdrawInfo;
  wallets: WalletData[];
};

export type FundWithdraw = {
  percent: number;
  currency: string;
};
