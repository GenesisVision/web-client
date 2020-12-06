import { TimeInForce } from "pages/trade/binance-trade-page/trading/terminal.types";

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
