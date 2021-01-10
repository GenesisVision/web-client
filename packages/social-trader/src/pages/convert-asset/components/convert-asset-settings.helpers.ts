import { TFunction } from "i18next";
import { number, string } from "yup";

export enum CONVERT_ASSET_FIELDS {
  isProcessingRealTime = "isProcessingRealTime",
  hourProcessing = "hourProcessing",
  tradesDelay = "tradesDelay",
  currency = "currency",
  periodLength = "periodLength",
  successFee = "successFee",
  stopOutLevel = "stopOutLevel",
  volumeFee = "volumeFee",
  title = "title",
  description = "description",
  logo = "logo",
  managementFee = "managementFee",
  investmentLimit = "investmentLimit"
}

export const investmentLimitShape = (
  hasInvestmentLimit: boolean,
  t: TFunction
) =>
  hasInvestmentLimit
    ? number()
        .min(0, t("validations.investment-limit-min"))
        .lessThan(10000000000, "Investment Limit must be less than 10000000000")
        .required(t("validations.investment-limit-required"))
    : number();

export const stopOutLevelShape = (t: TFunction, currentValue?: number) =>
  number()
    .required(t("validations.stop-out-required"))
    .min(10, t("validations.stop-out-is-zero"))
    .max(currentValue || 100, t("validations.stop-out-is-large"));

export const currencyShape = (t: TFunction) =>
  string().required(t("validations.currency-required"));

export const periodLengthShape = (t: TFunction) =>
  number().required(t("validations.period-required"));
