import {
  AssetBalance,
  OrderSide,
  OrderType,
  TerminalCurrency
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { tableLoaderCreator } from "utils/helpers";

export const mapPlaceOrderErrors = (error: string) => {
  switch (error) {
    case "Failed (-2015 Invalid API-key, IP, or permissions for action.)":
      return "Trading is currently unavailable";
    case "Failed (-2010 Account has insufficient balance for requested action.)":
      return "Order failed: insufficient balance";
    default:
      return error;
  }
};

export const getTradeType = ({
  type,
  side,
  currentPrice,
  price
}: {
  type: OrderType;
  side: OrderSide;
  currentPrice: number | string;
  price: number | string;
}): OrderType => {
  switch (type) {
    case "TakeProfitLimit":
      switch (side) {
        case "Buy":
          return +price < +currentPrice ? "TakeProfitLimit" : "StopLossLimit";
        case "Sell":
          return +price > +currentPrice ? "TakeProfitLimit" : "StopLossLimit";
      }
      break;
    default:
      return type;
  }
};

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
