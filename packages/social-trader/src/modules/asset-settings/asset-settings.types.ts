import { IImageValue } from "components/form/input-image/input-image";
import {
  FollowDetailsFull,
  FundDetailsFull,
  PrivateTradingAccountFull,
  ProgramDetailsFull
} from "gv-api-web";
import { SetSubmittingType } from "utils/types";

export type AssetDescriptionType = ProgramDetailsFull &
  FundDetailsFull &
  FollowDetailsFull &
  PrivateTradingAccountFull;

export type TUpdateAssetFunc = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    hasInvestmentLimit?: number;
    stopOutLevel?: number;
  },
  setSubmitting: SetSubmittingType,
  resetForm?: () => void
) => void;
