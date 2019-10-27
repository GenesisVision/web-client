import { FundDetailsFull, ProgramDetailsFullOld } from "gv-api-web";
import { IImageValue } from "shared/components/form/input-image/input-image";
import { SetSubmittingType } from "shared/utils/types";

export type AssetDescriptionType = ProgramDetailsFullOld & FundDetailsFull;

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
