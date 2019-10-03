import {
  FundWithdrawInfo,
  ManagerFundWithdrawInfo,
  WalletBaseData
} from "gv-api-web";

export type FundWithdrawalInfoResponse = {
  withdrawalInfo: FundWithdrawInfo;
  wallets: WalletBaseData[];
};

export type ManagerFundWithdrawalInfoResponse = {
  withdrawalInfo: ManagerFundWithdrawInfo;
  wallets: WalletBaseData[];
};

export type FundWithdraw = {
  percent: number;
  currency: string;
};
