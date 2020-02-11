import { NumberFormatValues } from "react-number-format";
import { validateFraction } from "utils/formatter";

export const INIT_WALLET_CURRENCY = "GVT";

export const isAllow = (currency: string) => ({
  formattedValue,
  value
}: NumberFormatValues): boolean =>
  (formattedValue === "" || validateFraction(value, currency)) && value !== ".";

export enum DEPOSIT_FORM_FIELDS {
  amount = "amount",
  walletId = "walletId"
}

export interface IDepositFormValues {
  [DEPOSIT_FORM_FIELDS.amount]: number | string;
  [DEPOSIT_FORM_FIELDS.walletId]: string;
}
