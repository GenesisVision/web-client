import { TFunction } from "i18next";
import { CurrencyEnum } from "utils/types";
import { number } from "yup";

export const depositAmountValidator = ({
  t,
  min,
  currency,
  availableToInvest,
  availableInWallet,
  availableToInvestInAsset
}: {
  t: TFunction;
  min: number;
  currency: CurrencyEnum;
  availableToInvest: number;
  availableInWallet: number;
  availableToInvestInAsset: number;
}) =>
  number()
    .required()
    .min(
      +min,
      t("validations.amount-min-value", {
        min,
        currency
      })
    )
    .max(
      availableToInvest,
      availableInWallet < availableToInvestInAsset
        ? t("validations.amount-more-than-available")
        : t("validations.amount-exceeds-limit")
    );
