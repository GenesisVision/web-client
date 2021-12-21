import { BinanceFuturesMarginChangeDirectionType } from "gv-api-web";

export enum ADJUST_MARGIN_FORM_FIELDS {
  amount = "amount"
}

export interface IAdjustMarginDefaultFormValues {
  [ADJUST_MARGIN_FORM_FIELDS.amount]: number;
}

export interface IAdjustMarginFormValues
  extends IAdjustMarginDefaultFormValues {
  type: BinanceFuturesMarginChangeDirectionType;
}

// https://www.binance.com/en/support/faq/360038447311
// i'm not sure that isolatedMaintMargin equals to isolatedMM cause it seems like values do not fit. (isolatedWallet - isolatedMM always exceeds second part of formula)
export const calculateMaxRemovableAmount = ({
  entryPrice,
  markPrice,
  quantity,
  isolatedWallet,
  isolatedMaintMargin,
  leverage
}: {
  isolatedMaintMargin: number;
  entryPrice: number;
  markPrice: number;
  quantity: number;
  isolatedWallet: number;
  leverage: number;
}): number => {
  const imr = 1 / leverage;

  return Math.max(
    0,
    Math.min(
      isolatedWallet - isolatedMaintMargin,
      isolatedWallet +
        quantity * (markPrice - entryPrice) -
        markPrice * Math.abs(quantity) * imr
    )
  );
};

// i guess crossPosition MM = crossPositionMaintMargin
// i'm not sure that first part of formula is correct, because it always exceeds the second one
export const calculateMaxAddableAmount = ({
  crossWalletBalance,
  crossPositionMaintMargin,
  openOrderInitialMargin,
  availableBalance
}: {
  crossWalletBalance: number;
  crossPositionMaintMargin: number;
  openOrderInitialMargin: number;
  availableBalance: number;
}): number => {
  return Math.min(
    crossWalletBalance - openOrderInitialMargin - crossPositionMaintMargin,
    availableBalance
  );
};
