import { WithTranslation } from "react-i18next";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { lazy, number, object } from "yup";

import {
  DEPOSIT_FORM_FIELDS,
  IDepositFormValues,
  IDepositOwnProps
} from "./deposit-form";

export const depositValidationSchema = ({
  minDeposit,
  t,
  currency
}: WithTranslation & IDepositOwnProps) =>
  lazy<IDepositFormValues>(values =>
    object<IDepositFormValues>().shape({
      [DEPOSIT_FORM_FIELDS.rate]: number(),
      [DEPOSIT_FORM_FIELDS.amount]: number()
        .required()
        .min(
          +formatCurrencyValue(
            convertToCurrency(minDeposit, values[DEPOSIT_FORM_FIELDS.rate]),
            values[DEPOSIT_FORM_FIELDS.walletCurrency]
          ),
          t("deposit-asset.validation.amount-min-value", {
            min: formatCurrencyValue(minDeposit, currency),
            currency,
            walletMin: formatCurrencyValue(
              convertToCurrency(minDeposit, values[DEPOSIT_FORM_FIELDS.rate]),
              values[DEPOSIT_FORM_FIELDS.walletCurrency]
            ),
            walletCurrency: values[DEPOSIT_FORM_FIELDS.walletCurrency]
          })
        )
        .max(
          values[DEPOSIT_FORM_FIELDS.availableInWallet] || 0,
          t("deposit-asset.validation.amount-more-than-available")
        )
    })
  );
