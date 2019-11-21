import {
  CancelablePromise,
  FundAssetPlatformInfo,
  ProgramAssetPlatformInfo,
  WalletBaseData
} from "gv-api-web";
import { Dispatch } from "redux";
import {
  CurrencyEnum,
  ReduxDispatch,
  RootThunk,
  SetSubmittingType
} from "utils/types";

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
) => (args: TAssetInvestCreatorArgs) => CancelablePromise<null>;

export type TAssetInvestCreatorArgs = {
  id: string;
  amount: number;
  currency: CurrencyEnum;
};

export type TAssetDeposit = ({
  id,
  amount,
  currency
}: TAssetInvestCreatorArgs) => (dispatch: ReduxDispatch) => Promise<any>;
