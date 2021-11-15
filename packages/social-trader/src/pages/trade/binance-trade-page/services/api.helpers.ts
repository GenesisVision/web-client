import { DEFAULT_DECIMAL_SCALE } from "constants/constants";
import dayjs from "dayjs";
import {
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
  SpotOrder,
  StringBidDepth,
  TradeRequest
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
}: BinanceRawOrder): SpotOrder => ({
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
  // to do Trailing stop

  const postBuy = ({
    reduceOnly,
    timeInForce,
    stopPrice,
    accountId,
    symbol,
    price,
    quantity,
    positionSide,
    type,
    ...rest
  }: TradeRequest & {
    accountId?: string;
  }): Promise<PlacedOrderType> => {
    return newOrder(
      {
        ...rest,
        reduceOnly: positionSide === "Both" ? reduceOnly : undefined,
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
    positionSide,
    type,
    ...rest
  }: TradeRequest & {
    accountId?: string;
  }): Promise<PlacedOrderType> => {
    return newOrder(
      {
        ...rest,
        reduceOnly: positionSide === "Both" ? reduceOnly : undefined,
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
