import { CommonWalletType } from "components/wallet-select/wallet-select";
import { TFunction } from "i18next";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";
import { number } from "yup";

export enum CREATE_ACCOUNT_FORM_FIELDS {
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount"
}

const getAvailable = (wallet: CommonWalletType, rate: number): number => {
  return convertFromCurrency(wallet ? wallet.available : 0, rate);
};

export const depositAmountShape = ({
  wallet,
  rate,
  minDeposit,
  t
}: {
  rate: number;
  minDeposit: number;
  wallet: CommonWalletType;
  t: TFunction;
}) => {
  const minDepositAmount = convertFromCurrency(minDeposit, rate);
  return number()
    .required(t("validations.amount-required"))
    .min(
      minDepositAmount,
      t("validations.amount-more-than-min-deposit", {
        value: `${formatCurrencyValue(minDepositAmount, wallet.currency)} ${
          wallet.currency
        }`
      })
    )
    .max(
      getAvailable(wallet, 1),
      t("validations.amount-more-than-account-balance")
    );
};
