import { Currency, FundWithdrawInfo, WalletBaseData } from "gv-api-web";

export type FundWithdrawInfoResponse = {
  withdrawInfo: FundWithdrawInfo;
  wallets: WalletBaseData[];
};

export type FundWithdraw = {
  percent: number;
  currency: Currency;
};
