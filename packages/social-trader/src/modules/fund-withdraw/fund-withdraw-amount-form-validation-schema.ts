import { TFunction } from "i18next";
import { FUND_WITHDRAW_FIELDS } from "modules/fund-withdraw/fund-withdraw.types";
import { number, object } from "yup";

export const MIN_FUND_WITHDRAW_VALUE = 0.01;

export const fundWithdrawAmountFormValidationSchema = (
  t: TFunction,
  minAmount: number
) =>
  object().shape({
    [FUND_WITHDRAW_FIELDS.percent]: number()
      .required(t("withdraw-fund.validation.required"))
      .min(minAmount, t("withdraw-fund.validation.min-value", { minAmount }))
  });
