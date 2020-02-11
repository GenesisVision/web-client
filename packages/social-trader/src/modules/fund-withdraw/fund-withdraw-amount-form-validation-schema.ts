import { TFunction } from "i18next";
import { FUND_WITHDRAW_FIELDS } from "modules/fund-withdraw/fund-withdraw.types";
import { number, object } from "yup";

export const MIN_FUND_WITHDRAW_VALUE = 0;
export const fundWithdrawAmountFormValidationSchema = (t: TFunction, a: any) =>
  object().shape({
    [FUND_WITHDRAW_FIELDS.percent]: number()
      .required(t("withdraw-fund.validation.required"))
      .min(0.01, t("withdraw-fund.validation.min-value"))
  });
