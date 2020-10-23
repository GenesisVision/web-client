import {
  DEPOSIT_FORM_FIELDS,
  getMinDepositFromAmounts,
  IDepositFormValues
} from "components/deposit/components/deposit.helpers";
import { MinDepositType } from "components/deposit/components/deposit.types";
import { WalletBaseData } from "gv-api-web";
import { TFunction } from "i18next";
import { convertToCurrency } from "utils/currency-converter";
import { safeGetElemFromArray } from "utils/helpers";
import { lazy, number, object, Schema } from "yup";

export const depositValidationSchema = ({
  rate,
  wallets,
  availableToInvestInAsset,
  minDeposit,
  t
}: {
  rate: number;
  wallets: WalletBaseData[];
  t: TFunction;
  minDeposit: MinDepositType;
  availableToInvestInAsset: number;
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
