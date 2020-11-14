import { MinDepositType } from "components/deposit/components/deposit.types";
import { getFundMinDeposit } from "components/deposit/services/program-deposit.service";
import { AmountWithCurrency } from "gv-api-web";
import { NumberFormatValues } from "react-number-format";
import { validateFraction } from "utils/formatter";
import { CurrencyEnum } from "utils/types";

export const INIT_WALLET_CURRENCY = "GVT";

export const isAllow = (currency: string) => ({
  formattedValue,
  value
}: NumberFormatValues): boolean =>
  (formattedValue === "" || validateFraction(value, currency)) && value !== ".";

export enum DEPOSIT_FORM_FIELDS {
  availableInWallet = "availableInWallet",
  amount = "amount",
  walletId = "walletId"
}

export interface IDepositFormValues {
  [DEPOSIT_FORM_FIELDS.availableInWallet]: number;
  [DEPOSIT_FORM_FIELDS.amount]: number | string;
  [DEPOSIT_FORM_FIELDS.walletId]: string;
}

export const getMinDepositFromAmounts = (
  amounts: AmountWithCurrency[],
  cur: CurrencyEnum
): number => {
  const amountInCurr = amounts.find(({ currency }) => currency === cur);
  return amountInCurr ? amountInCurr.amount : 0;
};

export const getMinDeposit = (
  minDeposit: MinDepositType,
  currency: CurrencyEnum,
  callback: (value: number) => number | string = value => value
): number | string => {
  return Array.isArray(minDeposit)
    ? getFundMinDeposit(minDeposit, currency)
    : callback(minDeposit);
};
