import { FundAssetPlatformInfo, ProgramAssetPlatformInfo } from "gv-api-web";
import { CurrencyEnum, SetSubmittingType } from "utils/types";

export type TFees = { gvCommission: number; entryFee?: number };

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
) => (args: TAssetInvestCreatorArgs) => Promise<null>;

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
