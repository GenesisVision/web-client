import { TFunction } from "i18next";
import { CurrencyEnum } from "utils/types";

export const depositAmountRules = ({
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
}) => ({
  required: t("validations.required"),
  min: {
    value: min,
    message: t("validations.amount-min-value", {
      min,
      currency
    })
  },
  max: {
    value: availableToInvest,
    message:
      availableInWallet < availableToInvestInAsset
        ? t("validations.amount-more-than-available")
        : t("validations.amount-exceeds-limit")
  }
});
