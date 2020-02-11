import { TFunction } from "i18next";
import { FUND_WITHDRAW_FIELDS } from "modules/fund-withdraw/fund-withdraw.types";
import { number, object } from "yup";

const fundWithdrawAmountFormValidationSchema = (t: TFunction) =>
  object().shape({
    [FUND_WITHDRAW_FIELDS.percent]: number()
      .required(t("withdraw-fund.validation.required"))
      .min(0.01, t("withdraw-fund.validation.min-value"))
  });
