import { CommonWalletType } from "components/wallet-select/wallet-select";
import { TFunction } from "i18next";
import { convertFromCurrency } from "utils/currency-converter";
import { formatCurrencyValue } from "utils/formatter";

export enum CREATE_ACCOUNT_FORM_FIELDS {
  depositWalletId = "depositWalletId",
  depositAmount = "depositAmount"
}

const getAvailable = (wallet: CommonWalletType, rate: number): number => {
  return convertFromCurrency(wallet ? wallet.available : 0, rate);
};

export const depositAmountRules = ({
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
  return {
    required: t("validations.amount-required"),
    min: {
      value: minDepositAmount,
      message: t("validations.amount-more-than-min-deposit", {
        value: `${formatCurrencyValue(minDepositAmount, wallet.currency)} ${
          wallet.currency
        }`
      })
    },
    max: {
      value: getAvailable(wallet, 1),
      message: t("validations.amount-more-than-account-balance")
    }
  };
};
