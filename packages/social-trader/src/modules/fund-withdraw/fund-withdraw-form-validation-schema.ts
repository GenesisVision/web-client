import { TFunction } from "i18next";
import { FUND_WITHDRAW_FIELDS } from "modules/fund-withdraw/fund-withdraw.types";
import { number, object } from "yup";

export const MIN_FUND_WITHDRAW_VALUE = 0.01;

export const fundWithdrawFormValidationSchema = (
  t: TFunction,
  minAmount: number
) =>
  object().shape({
    [FUND_WITHDRAW_FIELDS.percent]: number()
      .required(t("validations.required"))
      .min(minAmount, t("validations.min-value", { minAmount }))
  });
