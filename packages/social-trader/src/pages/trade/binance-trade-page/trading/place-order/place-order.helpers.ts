import {
  AssetBalance,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { tableLoaderCreator } from "utils/helpers";

export const RANGE_MARKS = {
  0: "0%",
  25: "25%",
  50: "50%",
  75: "75%",
  100: "100%"
};

export const getBalanceLoaderData = (
  asset: string = "BTC"
) => (): AssetBalance => ({
  asset,
  amountInCurrency: 0,
  total: 0,
  free: 0,
  locked: 0
});

export const getBalancesLoaderData = (asset: string) =>
  tableLoaderCreator(getBalanceLoaderData(asset), 1);

export const getBalance = (
  balances: AssetBalance[],
  currency: TerminalCurrency
) => {
  const wallet = balances.find(({ asset }) => asset === currency);
  return wallet ? wallet.free : 0;
};
