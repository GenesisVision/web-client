import {
  DEPOSIT_FORM_FIELDS,
  getMinDepositFromAmounts,
  IDepositFormValues
} from "components/deposit/components/deposit.helpers";
import { MinDepositType } from "components/deposit/components/deposit.types";
import { TFunction } from "i18next";
import { convertToCurrency } from "utils/currency-converter";
import { CurrencyEnum } from "utils/types";
import { lazy, number, object, Schema } from "yup";

export const depositValidationSchema = ({
  rate,
  walletCurrency,
  availableToInvestInAsset,
  minDeposit,
  t
}: {
  rate: number;
  walletCurrency: CurrencyEnum;
  t: TFunction;
  minDeposit: MinDepositType;
  availableToInvestInAsset: number;
}) => {
  return lazy((values: IDepositFormValues) => {
    const availableInWallet = values[DEPOSIT_FORM_FIELDS.availableInWallet];
    const availableToInvest = Math.min(
      availableInWallet,
      convertToCurrency(availableToInvestInAsset, rate)
    );

    const min = getMinDepositFromAmounts(minDeposit, walletCurrency);

    return object<IDepositFormValues>().shape({
      [DEPOSIT_FORM_FIELDS.amount]: number()
        .required()
        .min(
          +min,
          t("validations.amount-min-value", {
            min,
            currency: walletCurrency
          })
        )
        .max(
          availableToInvest,
          availableInWallet < availableToInvestInAsset
            ? t("validations.amount-more-than-available")
            : t("validations.amount-exceeds-limit")
        )
    }) as Schema<IDepositFormValues>;
  });
};
