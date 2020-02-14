import { CurrencyEnum } from "utils/types";

export type TFees = { gvCommission: number; entryFee?: number };

export type TAssetInvestCreatorArgs = {
  walletId: string;
  id: string;
  amount: number;
  currency: CurrencyEnum;
};

export type TAssetDeposit = ({
  id,
  amount
}: TAssetInvestCreatorArgs) => Promise<any>;
