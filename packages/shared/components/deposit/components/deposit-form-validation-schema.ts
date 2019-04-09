import { InjectedTranslateProps } from "react-i18next";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { lazy, number, object } from "yup";

import { IDepositFormValues, IDepositProps } from "./deposit-form";

export const managerSchema = (
  params: InjectedTranslateProps & IDepositProps
) => {
  const { info, t, currency } = params;
  return lazy<IDepositFormValues>(values => {
    return object<IDepositFormValues>().shape({
      rate: number(),
      maxAmount: number(),
      amount: number()
        .required()
        .min(
          +formatCurrencyValue(
            convertToCurrency(info.minInvestmentAmount, values.rate),
            values.walletCurrency
          ),
          t("deposit-asset.validation.amount-min-value", {
            min: formatCurrencyValue(info.minInvestmentAmount, currency),
            currency,
            walletMin: formatCurrencyValue(
              convertToCurrency(info.minInvestmentAmount, values.rate),
              values.walletCurrency
            ),
            walletCurrency: values.walletCurrency
          })
        )
        .max(
          values.availableInWallet || 0,
          t("deposit-asset.validation.amount-more-than-available")
        )
    });
  });
};

export const investorSchema = (
  params: InjectedTranslateProps & IDepositProps
) => {
  const { info, t, currency } = params;
  return lazy<IDepositFormValues>(values => {
    return object<IDepositFormValues>().shape({
      rate: number(),
      maxAmount: number(),
      amount: number()
        .required()
        .min(
          +formatCurrencyValue(
            convertToCurrency(info.minInvestmentAmount, values.rate),
            values.walletCurrency
          ),
          t("deposit-asset.validation.amount-min-value", {
            min: formatCurrencyValue(info.minInvestmentAmount, currency),
            currency,
            walletMin: formatCurrencyValue(
              convertToCurrency(info.minInvestmentAmount, values.rate),
              values.walletCurrency
            ),
            walletCurrency: values.walletCurrency
          })
        )
        .max(
          Math.min(
            values.availableInWallet || 0,
            values.availableToInvest || 0
          ),
          (values.availableInWallet || 0) < (values.availableToInvest || 0)
            ? t("deposit-asset.validation.amount-more-than-available")
            : t("deposit-asset.validation.amount-exceeds-limit")
        )
    });
  });
};
