import {
  AssetBalance,
  OrderSide,
  OrderType,
  TerminalCurrency,
  TimeInForce
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { tableLoaderCreator } from "utils/helpers";

export type PlaceOrderFormSetValueType = (
  name: string,
  value?: number,
  shouldValidate?: boolean
) => void;

export enum TRADE_FORM_FIELDS {
  reduceOnly = "reduceOnly",
  timeInForce = "timeInForce",
  stopPrice = "stopPrice",
  price = "price",
  quantity = "quantity",
  total = "total"
}

export interface IPlaceOrderDefaultFormValues {
  [TRADE_FORM_FIELDS.reduceOnly]?: boolean;
  [TRADE_FORM_FIELDS.timeInForce]?: TimeInForce;
  [TRADE_FORM_FIELDS.quantity]: number;
  [TRADE_FORM_FIELDS.total]: number;
  [TRADE_FORM_FIELDS.price]: number;
}

export interface IStopLimitFormValues extends IPlaceOrderDefaultFormValues {
  [TRADE_FORM_FIELDS.stopPrice]: number;
}

export interface IPlaceOrderFormValues extends IPlaceOrderDefaultFormValues {}

export interface IPlaceOrderHandleSubmitValues extends IPlaceOrderFormValues {
  type: OrderType;
}

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
