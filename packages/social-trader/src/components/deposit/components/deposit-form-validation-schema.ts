import {
  DEPOSIT_FORM_FIELDS,
  IDepositFormValues
} from "components/deposit/components/deposit.helpers";
import { WalletBaseData } from "gv-api-web";
import { TFunction } from "i18next";
import { convertToCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { safeGetElemFromArray } from "utils/helpers";
import { CurrencyEnum } from "utils/types";
import { lazy, number, object } from "yup";

export const depositValidationSchema = ({
  rate,
  wallets,
  availableToInvestInAsset,
  minDeposit,
  t,
  currency
}: {
  rate: number;
  wallets: WalletBaseData[];
  t: TFunction;
  minDeposit: number;
  availableToInvestInAsset: number;
  currency: CurrencyEnum;
}) =>
  lazy<IDepositFormValues>(values => {
    const walletId = values[DEPOSIT_FORM_FIELDS.walletId];
    const wallet = safeGetElemFromArray(wallets, ({ id }) => id === walletId);
    const walletCurrency = wallet.currency;
    const availableInWallet = wallet.available;
    const availableToInvest = Math.min(
      availableInWallet,
      convertToCurrency(availableToInvestInAsset, rate)
    );

    const walletMin = formatCurrencyValue(
      convertToCurrency(minDeposit, rate),
      walletCurrency
    );
    return object<IDepositFormValues>().shape({
      [DEPOSIT_FORM_FIELDS.amount]: number()
        .required()
        .min(
          +walletMin,
          t("deposit-asset.validation.amount-min-value", {
            min: formatCurrencyValue(minDeposit, currency),
            currency,
            walletMin,
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
