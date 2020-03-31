import { TFunction } from "i18next";
import { CurrencyEnum } from "utils/types";
import {
  btcWalletValidator,
  ethGvtWalletValidator,
  twoFactorValidator
} from "utils/validators/validators";
import { object } from "yup";

export enum WALLET_WITHDRAW_FIELDS {
  id = "id",
  currency = "currency",
  amount = "amount",
  address = "address",
  twoFactorCode = "twoFactorCode"
}

export const walletWithdrawValidationSchema = ({
  t,
  twoFactorEnabled,
  currency
}: {
  t: TFunction;
  twoFactorEnabled: boolean;
  currency: CurrencyEnum;
}) => {
  switch (currency) {
    case "GVT":
    case "ETH":
    case "USDT":
      return object().shape({
        [WALLET_WITHDRAW_FIELDS.address]: ethGvtWalletValidator.required(
          t("wallet-withdraw.validation.address-is-required")
        ),
        [WALLET_WITHDRAW_FIELDS.twoFactorCode]: twoFactorValidator(
          t,
          twoFactorEnabled
        )
      });
    default:
      return object().shape({
        [WALLET_WITHDRAW_FIELDS.address]: btcWalletValidator.required(
          t("wallet-withdraw.validation.address-is-required")
        ),
        [WALLET_WITHDRAW_FIELDS.twoFactorCode]: twoFactorValidator(
          t,
          twoFactorEnabled
        )
      });
  }
};
