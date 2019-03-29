import { InjectedTranslateProps } from "react-i18next";
import { convertToCurrency } from "shared/utils/currency-converter";
import { formatCurrencyValue } from "shared/utils/formatter";
import { lazy, number, object } from "yup";

import { FormValues, OwnProps } from "./deposit-form";

export const managerSchema = (params: InjectedTranslateProps & OwnProps) => {
  const { info, t, currency } = params;
  return lazy<FormValues>(values => {
    return object<FormValues>().shape({
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
          values.availableInWallet,
          t("deposit-asset.validation.amount-more-than-available")
        )
    });
  });
};

export const investorSchema = (params: InjectedTranslateProps & OwnProps) => {
  const { info, t, currency } = params;
  return lazy<FormValues>(values => {
    return object<FormValues>().shape({
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
          Math.min(values.availableInWallet, values.availableToInvest),
          values.availableInWallet < values.availableToInvest
            ? t("deposit-asset.validation.amount-more-than-available")
            : t("deposit-asset.validation.amount-exceeds-limit")
        )
    });
  });
};
