import { TimeInForce } from "pages/trade/binance-trade-page/trading/terminal.types";

export type QuantityType = string;
export type TotalType = string;
export type PriceType = string;

export type PlaceOrderFormSetValueType = (
  name: string,
  value?: QuantityType | TotalType | PriceType,
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
  [TRADE_FORM_FIELDS.quantity]: QuantityType;
  [TRADE_FORM_FIELDS.total]: TotalType;
  [TRADE_FORM_FIELDS.price]: PriceType;
}

export interface IStopLimitFormValues extends IPlaceOrderDefaultFormValues {
  [TRADE_FORM_FIELDS.stopPrice]: PriceType;
}

export interface IPlaceOrderFormValues extends IPlaceOrderDefaultFormValues {}
