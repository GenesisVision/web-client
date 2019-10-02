import { FundDetailsFull, ProgramDetailsFull } from "gv-api-web";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { SetSubmittingType } from "shared/utils/types";

export type AssetDescriptionType = ProgramDetailsFull & FundDetailsFull;

export type TUpdateAssetFunc = (
  values: {
    description?: string;
    logo?: IImageValue;
    investmentLimit?: number;
    stopOutLevel?: number;
  },
  setSubmitting: SetSubmittingType,
  resetForm?: () => void
) => void;
