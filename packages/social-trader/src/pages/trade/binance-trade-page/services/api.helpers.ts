import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import dayjs from "dayjs";
import {
  BinanceRawFuturesOrder,
  BinanceRawFuturesPlacedOrder,
  BinanceRawFuturesPlaceOrder,
  BinanceRawKline,
  BinanceRawOrder,
  BinanceRawOrderBookEntry,
  BinanceRawPlacedOrder,
  BinanceRawPlaceOrder,
  BinanceWorkingType
} from "gv-api-web";
import { Bar } from "pages/trade/binance-trade-page/trading/chart/charting_library/datafeed-api";
import { DividerPartsType } from "pages/trade/binance-trade-page/trading/order-book/order-book.helpers";
import {
  FuturesOrder,
  FuturesOrderStatus,
  FuturesOrderType,
  StringBidDepth,
  TradeRequest,
  UnitedOrder
} from "pages/trade/binance-trade-page/trading/terminal.types";
import { OrderRequest } from "services/request.service";
import { formatValue } from "utils/formatter";

import { setUpperFirstLetter } from "../trading/terminal.helpers";

export const transformKlineBar = ({
  close,
  high,
  low,
  open,
  openTime,
  baseVolume
}: BinanceRawKline): Bar => ({
  close,
  high,
  low,
  open,
  time: dayjs(openTime).unix() * 1000,
  volume: baseVolume
});

export const transformToUnitedOrder = ({
  commissionAsset,
  status,
  commission,
  quoteQuantityFilled,
  orderId,
  createTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  quantity,
  quoteQuantity,
  quantityFilled
}: BinanceRawOrder): UnitedOrder => ({
  commissionAsset,
  orderStatus: status,
  commission,
  quoteQuantityFilled,
  executedQuantity: quoteQuantity,
  id: orderId,
  time: createTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  quantityFilled,
  quantity
});

export const transformFuturesOrder = ({
  status,
  orderId,
  createdTime,
  symbol,
  type,
  side,
  stopPrice,
  price,
  positionSide,
  quantity,
  quantityFilled,
  reduceOnly,
  workingType,
  closePosition,
  activatePrice,
  avgPrice,
  callbackRate,
  originalType,
  timeInForce
}: BinanceRawFuturesOrder): FuturesOrder => ({
  activatePrice,
  averagePrice: avgPrice,
  callbackRate,
  originalType: originalType as FuturesOrderType,
  timeInForce,
  positionSide,
  closePosition,
  quantityFilled,
  workingType,
  reduceOnly,
  orderStatus: status as FuturesOrderStatus,
  time: createdTime,
  symbol,
  type: type as FuturesOrderType,
  side,
  quantity,
  stopPrice,
  price,
  id: orderId
});

export const getPriceWithCorrectFrac = (
  price: string,
  correctFracLength: number = 8
) => {
  const [int, frac = ""] = price.split(".");
  const correctFrac = frac + "0".repeat(correctFracLength - frac.length);
  return [int, correctFrac].join(".");
};

export const transformDepthToString = (dividerParts: DividerPartsType) => ({
  price,
  quantity
}: BinanceRawOrderBookEntry): StringBidDepth => {
  const newPrice = getPriceWithCorrectFrac(
    formatValue(price, DEFAULT_DECIMAL_SCALE),
    dividerParts.fracLength
  );
  return [newPrice, String(quantity)];
};

export type PlaceOrderType = BinanceRawPlaceOrder | BinanceRawFuturesPlaceOrder;

export type PlacedOrderType =
  | BinanceRawPlacedOrder
  | BinanceRawFuturesPlacedOrder;

export type PlaceOrderRequest = (options: {
  body?: PlaceOrderType;
  accountId?: string;
}) => Promise<PlacedOrderType>;

export const newOrderRequestCreator = (request: PlaceOrderRequest) => (
  options: OrderRequest,
  accountId?: string
) =>
  request({
    body: {
      ...options,
      price: options.price ? +options.price : undefined,
      quantity: options.quantity ? +options.quantity : undefined
    } as PlaceOrderType,
    accountId
  });

export const createSpotPlaceBuySellOrderRequest = (
  request: PlaceOrderRequest
) => {
  const newOrder = newOrderRequestCreator(request);

  const postBuy = ({
    reduceOnly,
    timeInForce,
    stopPrice,
    accountId,
    symbol,
    price,
    quantity,
    type,
    ...rest
  }: TradeRequest & {
    accountId?: string;
  }): Promise<PlacedOrderType> => {
    return newOrder(
      {
        ...rest,
        reduceOnly,
        stopPrice:
          type === "TakeProfitLimit" || type === "StopLossLimit"
            ? stopPrice
            : undefined,
        symbol,
        type,
        price:
          type === "Limit" ||
          type === "TakeProfitLimit" ||
          type === "StopLossLimit"
            ? String(price)
            : undefined,
        quantity: String(quantity),
        timeInForce,
        side: "Buy"
      },
      accountId
    );
  };

  const postSell = ({
    reduceOnly,
    timeInForce,
    stopPrice,
    accountId,
    symbol,
    price,
    quantity,
    type,
    ...rest
  }: TradeRequest & {
    accountId?: string;
  }): Promise<PlacedOrderType> => {
    return newOrder(
      {
        ...rest,
        reduceOnly,
        stopPrice:
          type === "TakeProfitLimit" || type === "StopLossLimit"
            ? stopPrice
            : undefined,
        symbol,
        type,
        price:
          type === "Limit" ||
          type === "TakeProfitLimit" ||
          type === "StopLossLimit"
            ? String(price)
            : undefined,
        quantity: String(quantity),
        timeInForce,
        side: "Sell"
      },
      accountId
    );
  };

  return { postBuy, postSell };
};

export const createFuturesPlaceBuySellOrderRequest = (
  request: PlaceOrderRequest
) => {
  const newOrder = newOrderRequestCreator(request);

  const postBuy = ({
    reduceOnly,
    timeInForce,
    stopPrice,
    accountId,
    symbol,
    price,
    quantity,
    type,
    ...rest
  }: TradeRequest & {
    accountId?: string;
  }): Promise<PlacedOrderType> => {
    return newOrder(
      {
        ...rest,
        reduceOnly,
        stopPrice:
          type === "TakeProfit" ||
          type === "Stop" ||
          type === "StopMarket" ||
          type === "TakeProfitMarket"
            ? stopPrice
            : undefined,
        symbol,
        type,
        price:
          (type === "Limit" ||
            type === "TakeProfit" ||
            type === "Stop" ||
            type === "StopMarket" ||
            type === "TakeProfitMarket") &&
          price
            ? String(price)
            : undefined,
        quantity: quantity ? String(quantity) : undefined,
        timeInForce,
        side: "Buy"
      },
      accountId
    );
  };

  const postSell = ({
    reduceOnly,
    timeInForce,
    stopPrice,
    accountId,
    symbol,
    price,
    quantity,
    type,
    ...rest
  }: TradeRequest & {
    accountId?: string;
  }): Promise<PlacedOrderType> => {
    return newOrder(
      {
        ...rest,
        reduceOnly,
        stopPrice:
          type === "TakeProfit" ||
          type === "Stop" ||
          type === "StopMarket" ||
          type === "TakeProfitMarket"
            ? stopPrice
            : undefined,
        symbol,
        type,
        price:
          (type === "Limit" ||
            type === "TakeProfit" ||
            type === "Stop" ||
            type === "StopMarket" ||
            type === "TakeProfitMarket") &&
          price
            ? String(price)
            : undefined,
        quantity: quantity ? String(quantity) : undefined,
        timeInForce,
        side: "Sell"
      },
      accountId
    );
  };

  return { postBuy, postSell };
};

export const convertBinanceTypeIntoGV = (str: string) => {
  return str.split("_").map(setUpperFirstLetter).join("");
};

// fix naming
export const getWorkingTypeType = (str: string): BinanceWorkingType => {
  const [type] = str.split("_");
  return setUpperFirstLetter(type) as BinanceWorkingType;
};
