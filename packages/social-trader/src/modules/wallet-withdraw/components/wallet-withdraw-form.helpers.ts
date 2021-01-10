import { TFunction } from "i18next";
import { IWalletWithdrawFormValues } from "modules/wallet-withdraw/components/wallet-withdraw-form";
import {
  btcWalletValidator,
  ethGvtWalletValidator
} from "utils/validators/validators";

export enum WALLET_WITHDRAW_FIELDS {
  id = "id",
  currency = "currency",
  amount = "amount",
  address = "address",
  twoFactorCode = "twoFactorCode"
}

export const getWalletWithdrawValidationSchema = ({
  t,
  watch
}: {
  t: TFunction;
  watch: () => IWalletWithdrawFormValues;
}) => {
  const { currency } = watch();

  switch (currency) {
    case "GVT":
    case "ETH":
    case "USDC":
    case "USDT":
      return ethGvtWalletValidator.required(
        t("validations.address-is-required")
      );
    case "BTC":
    default:
      return btcWalletValidator.required(t("validations.address-is-required"));
  }
};
