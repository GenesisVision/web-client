import { TFunction } from "i18next";
import {
  BalancesForTransfer,
  BalancesItemName,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { safeGetElemFromArray } from "utils/helpers";
import { minMaxNumberShape } from "utils/validators/validators";
import { lazy, number, object, Schema, string } from "yup";

export const ENABLE_TRANSFER_ACCOUNTS = [
  { asset: "BNB", title: "BNB" },
  { asset: "USDT", title: "TetherUS" }
];

export enum TRANSFER_FORM_FIELDS {
  asset = "asset",
  amount = "amount",
  type = "type"
}

export interface TransferFormValues {
  [TRANSFER_FORM_FIELDS.asset]: TerminalCurrency;
  [TRANSFER_FORM_FIELDS.amount]: number;
  [TRANSFER_FORM_FIELDS.type]: number; // 1 | 2
}

export const getBalanceNameFromNumber = (number: number): BalancesItemName => {
  switch (number) {
    case 1:
      return "spot";
    case 2:
    default:
      return "futures";
  }
};

export const getMaxValueForFuturesTransfer = ({
  type,
  asset,
  balances
}: {
  type: number;
  asset: string;
  balances: BalancesForTransfer;
}): number => {
  const balanceType = getBalanceNameFromNumber(type);
  const balance = balances[balanceType];
  return +safeGetElemFromArray(balance, balance => balance.asset === asset)
    .free;
};

export const futuresTransferValidationSchema = ({
  balances,
  t
}: {
  balances: BalancesForTransfer;
  t: TFunction;
}) => {
  return lazy<TransferFormValues>(({ asset, type }) => {
    const max = getMaxValueForFuturesTransfer({
      type,
      asset,
      balances
    });
    return object().shape({
      [TRANSFER_FORM_FIELDS.amount]: minMaxNumberShape({
        min: 0,
        max,
        t
      }),
      [TRANSFER_FORM_FIELDS.asset]: string(),
      [TRANSFER_FORM_FIELDS.type]: number()
    }) as Schema<TransferFormValues>;
  });
};
