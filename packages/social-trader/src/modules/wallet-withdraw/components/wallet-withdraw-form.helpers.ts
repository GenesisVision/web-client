import { TFunction } from "i18next";
import { IWalletWithdrawFormValues } from "modules/wallet-withdraw/components/wallet-withdraw-form";
import {
  btcGvtWalletRules,
  ethGvtWalletRules
} from "utils/validators/validators";

export enum WALLET_WITHDRAW_FIELDS {
  id = "id",
  currency = "currency",
  amount = "amount",
  address = "address",
  blockchain = "blockchain",
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
    case "BNB":
    case "USDC":
    case "USDT":
    case "DAI":
      return ethGvtWalletRules(t);
    case "BTC":
    default:
      return btcGvtWalletRules(t);
  }
};
