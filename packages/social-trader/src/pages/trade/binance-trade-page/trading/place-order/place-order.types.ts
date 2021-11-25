import { BinanceWorkingType } from "gv-api-web";
import {
  OrderSide,
  OrderType,
  TimeInForce
} from "pages/trade/binance-trade-page/trading/terminal.types";

export interface FilterValues {
  minPrice: number;
  maxPrice: number;
  minQuantity: number;
  maxQuantity: number;
  minNotional: number;
  tickSize: string;
  stepSize: string;
  marketMinQuantity: number;
  marketMaxQuantity: number;
  marketStepSize: string;
}

export type QuantityType = string;
export type TotalType = string;
export type PriceType = string;

export type FuturesPlaceOrderMode = "OneWay" | "HedgeOpen" | "HedgeClose";

export interface ISpotPlaceOrderHandleSubmitValues
  extends ISpotPlaceOrderFormValues {
  type: OrderType;
}

export type PlaceOrderFormSetValueType = (
  name: string,
  value?: QuantityType | TotalType | PriceType,
  shouldValidate?: boolean
) => void;

export enum SPOT_TRADE_FORM_FIELDS {
  timeInForce = "timeInForce",
  stopPrice = "stopPrice",
  price = "price",
  quantity = "quantity",
  total = "total"
}

export interface ISpotPlaceOrderDefaultFormValues {
  [SPOT_TRADE_FORM_FIELDS.timeInForce]?: TimeInForce;
  [SPOT_TRADE_FORM_FIELDS.quantity]: QuantityType;
  [SPOT_TRADE_FORM_FIELDS.total]: TotalType;
  [SPOT_TRADE_FORM_FIELDS.price]: PriceType;
}

export interface ISpotStopLimitFormValues
  extends ISpotPlaceOrderDefaultFormValues {
  [SPOT_TRADE_FORM_FIELDS.stopPrice]: PriceType;
}

export interface ISpotPlaceOrderFormValues
  extends ISpotPlaceOrderDefaultFormValues {}

interface IAdditionalFuturesPlaceOrderInfo {
  type: OrderType;
  percentMode: any;
  side: OrderSide;
  sliderBuy: number;
  sliderSell: number;
}
export interface IFuturesPlaceOrderHandleSubmitValues
  extends IFuturesPlaceOrderFormValues,
    IAdditionalFuturesPlaceOrderInfo {}

export interface IFuturesStopLimitPlaceOrderHandleSubmitValues
  extends IFuturesStopLimitFormValues,
    IAdditionalFuturesPlaceOrderInfo {}

export enum FUTURES_TRADE_FORM_FIELDS {
  reduceOnly = "reduceOnly",
  timeInForce = "timeInForce",
  stopPrice = "stopPrice",
  price = "price",
  quantity = "quantity",
  workingType = "workingType"
}

export interface IFuturesPlaceOrderFormValues {
  [FUTURES_TRADE_FORM_FIELDS.reduceOnly]?: boolean;
  [FUTURES_TRADE_FORM_FIELDS.timeInForce]?: TimeInForce;
  [FUTURES_TRADE_FORM_FIELDS.quantity]: QuantityType;
  [FUTURES_TRADE_FORM_FIELDS.price]: PriceType;
}

export interface IFuturesStopLimitFormValues
  extends IFuturesPlaceOrderFormValues {
  [FUTURES_TRADE_FORM_FIELDS.stopPrice]: PriceType;
  [FUTURES_TRADE_FORM_FIELDS.workingType]: BinanceWorkingType;
}
