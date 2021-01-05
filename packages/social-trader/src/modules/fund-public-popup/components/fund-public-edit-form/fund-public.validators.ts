import { TFunction } from "i18next";
import {
  assetDescriptionShape,
  entryFeeShape,
  exitFeeShape
} from "utils/validators/validators";
import { object } from "yup";

export enum FUND_PUBLIC_FORM_FIELDS {
  title = "title",
  description = "description",
  entryFee = "entryFee",
  exitFee = "exitFee"
}

export interface IFundPublicFormValues {
  [FUND_PUBLIC_FORM_FIELDS.title]: string;
  [FUND_PUBLIC_FORM_FIELDS.description]: string;
  [FUND_PUBLIC_FORM_FIELDS.entryFee]: number;
  [FUND_PUBLIC_FORM_FIELDS.exitFee]: number;
}

interface SignalValidationSchemaProps {
  maxEntryFee: number;
  maxExitFee: number;
  t: TFunction;
}

export const fundPublicValidationSchema = ({
  maxEntryFee,
  maxExitFee,
  t
}: SignalValidationSchemaProps) =>
  object().shape({
    [FUND_PUBLIC_FORM_FIELDS.description]: assetDescriptionShape(t),
    [FUND_PUBLIC_FORM_FIELDS.entryFee]: entryFeeShape(t, maxEntryFee),
    [FUND_PUBLIC_FORM_FIELDS.exitFee]: exitFeeShape(t, maxExitFee)
  });
