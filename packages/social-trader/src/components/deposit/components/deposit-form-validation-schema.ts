import { WithTranslation } from "react-i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { lazy, number, object } from "yup";

import {
  DEPOSIT_FORM_FIELDS,
  IDepositFormValues,
  IDepositOwnProps
} from "./deposit-form";

export const depositValidationSchema = ({
  availableToInvest: availableToInvestProp,
  minDeposit,
  t,
  currency
}: WithTranslation & IDepositOwnProps) =>
  lazy<IDepositFormValues>(values => {
    const rate = values[DEPOSIT_FORM_FIELDS.rate];
    const walletCurrency = values[DEPOSIT_FORM_FIELDS.walletCurrency];
    const availableToInvestInAsset = convertToCurrency(
      availableToInvestProp || Number.MAX_SAFE_INTEGER,
      rate
    );
    const availableInWallet =
      values[DEPOSIT_FORM_FIELDS.availableInWallet] || 0;
    const availableToInvest = Math.min(
      availableInWallet,
      availableToInvestInAsset
    );
    return object<IDepositFormValues>().shape({
      [DEPOSIT_FORM_FIELDS.amount]: number()
        .required()
        .min(
          +formatCurrencyValue(
            convertToCurrency(minDeposit, rate),
            walletCurrency
          ),
          t("deposit-asset.validation.amount-min-value", {
            min: formatCurrencyValue(minDeposit, currency),
            currency,
            walletMin: formatCurrencyValue(
              convertToCurrency(minDeposit, rate),
              walletCurrency
            ),
            walletCurrency
          })
        )
        .max(
          availableToInvest,
          availableInWallet < availableToInvestInAsset
            ? t("deposit-asset.validation.amount-more-than-available")
            : t("deposit-asset.validation.amount-exceeds-limit")
        )
    });
  });
