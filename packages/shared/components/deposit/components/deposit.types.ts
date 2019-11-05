import {
  WalletBaseData,
  ProgramAssetPlatformInfo,
  FundAssetPlatformInfo
} from "gv-api-web";
import { CurrencyEnum, RootThunk, SetSubmittingType } from "shared/utils/types";

export type TInvestInfoWithWallets = {
  investInfo: TInvestInfo;
  wallets: WalletBaseData[];
};

export type TInvestInfo = FundAssetPlatformInfo | ProgramAssetPlatformInfo;

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
) => null;

export type TAssetInvestFn = (
  id: string,
  authorization: string,
  opts: { currency: CurrencyEnum; amount: number }
) => Promise<null>;

export type TAssetInvestCreator = (
  assetInvestFn: TAssetInvestFn
) => (args: {
  id: string;
  amount: number;
  currency: CurrencyEnum;
}) => RootThunk<Promise<null>>;
