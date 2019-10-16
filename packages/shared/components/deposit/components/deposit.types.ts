import { FundInvestInfo, ProgramInvestInfo, WalletBaseData } from "gv-api-web";
import { CurrencyEnum, RootThunk, SetSubmittingType } from "shared/utils/types";

export type TInvestInfoWithWallets = {
  investInfo: TInvestInfo;
  wallets: WalletBaseData[];
};

export type TInvestInfo = FundInvestInfo | ProgramInvestInfo;

export type TGetAssetInfoCreator = (
  getProgramInfoFn: (
    id: string,
    currency: CurrencyEnum,
    authorization: string
  ) => Promise<TInvestInfo>
) => (id: string, currency: CurrencyEnum) => Promise<TInvestInfo>;

export type TInvest = (
  amount: number,
  currency: CurrencyEnum,
  setSubmitting: SetSubmittingType
) => void;

export type TAssetInvestFn = (
  id: string,
  amount: number,
  authorization: string,
  opts: { currency: CurrencyEnum }
) => Promise<void>;

export type TAssetInvestCreator = (
  assetInvestFn: TAssetInvestFn
) => (
  args: {
    id: string;
    amount: number;
    currency: CurrencyEnum;
  }
) => RootThunk<Promise<void>>;
